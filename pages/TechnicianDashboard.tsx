import React, { useState } from 'react';
import { Card } from '../components/Card';
import { MiniLineChart } from '../components/charts/Charts';
import { technicianEarningsData, technicianEarningsDetails } from '../data/mockData';
import { Booking, Rating, Earning } from '../types';
import { Star, TrendingUp, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle } from '../components/icons';

const statusColorMap: { [key: string]: string } = {
    'Completed': 'bg-teal-100 text-teal-700',
    'Scheduled': 'bg-orange-100 text-orange-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Awaiting Feedback': 'bg-yellow-100 text-yellow-700',
    'Cancelled': 'bg-red-100 text-red-700',
};


const JobStatusPill: React.FC<{ status: Booking['status'] }> = ({ status }) => (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColorMap[status]}`}>
        {status}
    </span>
);

const DashboardView: React.FC<{ myJobs: Booking[] }> = ({ myJobs }) => {
    const scheduledJobs = myJobs.filter(j => j.status === 'Scheduled');
    const jobsCompletedToday = myJobs.filter(j => j.status === 'Completed' && j.date === new Date().toISOString().split('T')[0]).length;
    
    const totalJobs = myJobs.length;
    const completionPercentage = totalJobs > 0 ? (myJobs.filter(j => j.status === 'Completed' || j.status === 'Awaiting Feedback').length / totalJobs) * 100 : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card title="Today's Scheduled Jobs">
                    <div className="space-y-4">
                        {scheduledJobs.length > 0 ? scheduledJobs.map(job => (
                            <div key={job.id} className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-800">{job.service}</p>
                                        <p className="text-sm text-gray-600 font-medium">{job.customerName}</p>
                                        <div className="text-sm text-gray-500 mt-1 flex items-center">
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.customerAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline" aria-label={`View ${job.customerName}'s address on Google Maps`}>
                                                <MapPin className="w-4 h-4 mr-2" /> {job.customerAddress}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{job.time}</p>
                                        <JobStatusPill status={job.status} />
                                    </div>
                                </div>
                            </div>
                        )) : <p className="text-gray-500">No jobs scheduled for today.</p>}
                    </div>
                </Card>
            </div>
            <div className="space-y-6">
                <Card title="Weekly Earnings">
                     <MiniLineChart data={technicianEarningsData} dataKey="earnings" stroke="#0ea5e9" />
                </Card>
                <Card title="Job Completion">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-teal-600">{completionPercentage.toFixed(0)}%</p>
                        <p className="text-gray-500">of all jobs completed</p>
                    </div>
                     <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                        <div className="bg-gradient-to-r from-teal-400 to-emerald-500 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </Card>
                <Card title="Performance Snapshot">
                    <div className="flex justify-around text-center">
                        <div>
                            <p className="text-2xl font-bold">4.9</p>
                            <p className="text-sm text-gray-500">Avg. Rating</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{jobsCompletedToday}</p>
                            <p className="text-sm text-gray-500">Jobs Today</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const MyJobsPage: React.FC<{ jobs: Booking[], setJobs: React.Dispatch<React.SetStateAction<Booking[]>> }> = ({ jobs: initialJobs, setJobs }) => {
    const [jobs, setLocalJobs] = useState(initialJobs);
    const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

    const handleToggleDetails = (jobId: string) => {
        setExpandedJobId(prevId => (prevId === jobId ? null : jobId));
    };

    const handleMarkAsCompleted = (jobId: string) => {
        setJobs(prevJobs => prevJobs.map(job => 
            job.id === jobId ? { ...job, status: 'Awaiting Feedback' } : job
        ));
        setExpandedJobId(null);
    };


    return (
        <Card title="My Job History">
            <div className="space-y-4">
                {initialJobs.map(job => (
                    <div key={job.id} className="p-4 rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                        <div className="flex flex-wrap justify-between items-start cursor-pointer" onClick={() => handleToggleDetails(job.id)}>
                            <div>
                                <p className="font-bold text-lg text-gray-800">{job.service}</p>
                                <p className="text-sm text-gray-600 font-medium">{job.customerName}</p>
                                <p className="text-sm text-gray-500 flex items-center mt-1"><Calendar className="w-4 h-4 mr-2" />{job.date} at {job.time}</p>
                            </div>
                            <div className="text-right mt-2 sm:mt-0">
                                <JobStatusPill status={job.status} />
                                <button className="text-sm text-blue-600 hover:underline flex items-center justify-end mt-2">
                                    {expandedJobId === job.id ? 'Hide Details' : 'View Details'}
                                    {expandedJobId === job.id ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                                </button>
                            </div>
                        </div>

                        {expandedJobId === job.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-700">Job Details:</h4>
                                <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Issue Reported:</span> {job.reportedIssue}</p>
                                {job.specialInstructions && <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Instructions:</span> {job.specialInstructions}</p>}
                                <div className="text-sm text-gray-500 mt-2 flex items-center">
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.customerAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline" aria-label={`View ${job.customerName}'s address on Google Maps`}>
                                        <MapPin className="w-4 h-4 mr-2" /> {job.customerAddress}
                                    </a>
                                </div>
                                {job.status === 'Scheduled' || job.status === 'In Progress' ? (
                                    <div className="mt-4 flex justify-end">
                                        <button onClick={() => handleMarkAsCompleted(job.id)} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition flex items-center font-semibold text-sm">
                                            <CheckCircle className="w-5 h-5 mr-2" /> Mark as Completed
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

const EarningsPage: React.FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card title="Earnings Breakdown">
                <div>
                    <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Job ID</th><th className="px-6 py-3">Service</th><th className="px-6 py-3">Date</th><th className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {technicianEarningsDetails.map((earning: Earning) => (
                                <tr key={earning.jobId} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{earning.jobId}</td>
                                    <td className="px-6 py-4">{earning.service}</td>
                                    <td className="px-6 py-4">{earning.date}</td>
                                    <td className="px-6 py-4 text-right font-semibold text-gray-800">${earning.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                        {technicianEarningsDetails.map((earning) => (
                            <div key={earning.jobId} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-2">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-gray-800">{earning.service}</p>
                                <p className="font-semibold text-teal-600">${earning.amount.toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-gray-600">Job ID: {earning.jobId}</p>
                            <p className="text-xs text-gray-400 pt-1">{earning.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
        <div>
             <Card title="Earnings Summary">
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-500">This Week</p>
                        <p className="text-2xl font-bold text-gray-800">$1,250.00</p>
                    </div>
                     <div>
                        <p className="text-gray-500">This Month</p>
                        <p className="text-2xl font-bold text-gray-800">$4,120.50</p>
                    </div>
                    <div className="pt-2">
                        <p className="text-teal-600 font-semibold flex items-center"><TrendingUp className="w-5 h-5 mr-2" /> 15% more than last month</p>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);

const MyRatingsPage: React.FC<{ ratings: Rating[] }> = ({ ratings }) => (
    <Card title="My Customer Ratings">
        <div className="space-y-4">
            {ratings.length > 0 ? ratings.map((rating: Rating) => (
                <div key={rating.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800">{rating.customerName}</p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 italic">"{rating.comment}"</p>
                    <p className="text-xs text-gray-400 text-right mt-2">{rating.date}</p>
                </div>
            )) : <p className="text-gray-500">No ratings have been submitted yet.</p>}
        </div>
    </Card>
);

export const TechnicianDashboard: React.FC<{ 
    activePage: string; 
    bookings: Booking[];
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    ratings: Rating[];
    currentUser: { name: string };
}> = ({ activePage, bookings, setBookings, ratings, currentUser }) => {
    
    const myJobs = bookings.filter(b => b.technicianName === currentUser.name);
    const myJobIds = myJobs.map(j => j.id);
    const myRatings = ratings.filter(r => myJobIds.includes(r.jobId));
    
    switch (activePage) {
        case 'My Jobs': return <MyJobsPage jobs={myJobs} setJobs={setBookings} />;
        case 'Earnings': return <EarningsPage />;
        case 'My Ratings': return <MyRatingsPage ratings={myRatings} />;
        case 'Dashboard':
        default:
            return <DashboardView myJobs={myJobs} />;
    }
};