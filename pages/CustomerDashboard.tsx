import React, { useState } from 'react';
import { Card } from '../components/Card';
import { MiniLineChart } from '../components/charts/Charts';
import { customerSpendingData } from '../data/mockData';
import { Booking, Rating } from '../types';
import { Clock, Star, MessageSquare, Calendar } from '../components/icons';

const ProgressBar: React.FC<{ value: number, max: number, label: string }> = ({ value, max, label }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700">{label}</span>
            <span className="text-sm font-medium text-blue-700">{value} / {max} Points</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-2.5 rounded-full" style={{ width: `${(value / max) * 100}%` }}></div>
        </div>
    </div>
);

const statusColorMap: { [key: string]: string } = {
    'Completed': 'text-teal-600',
    'Scheduled': 'text-blue-600',
    'In Progress': 'text-orange-600',
    'Awaiting Feedback': 'text-yellow-600',
    'Cancelled': 'text-red-600',
};

const statusBgColorMap: { [key: string]: string } = {
    'Completed': 'bg-teal-100 text-teal-700',
    'Scheduled': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-orange-100 text-orange-700',
    'Awaiting Feedback': 'bg-yellow-100 text-yellow-700',
    'Cancelled': 'bg-red-100 text-red-700',
};


const FeedbackModal: React.FC<{ 
    booking: Booking;
    onClose: () => void;
    onSubmit: (ratingData: { rating: number; comment: string }) => void;
}> = ({ booking, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ rating, comment });
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Rate Your Service</h2>
                <p className="text-gray-600 mb-6">Service: <span className="font-semibold">{booking.service}</span> on {booking.date}</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                        <div className="flex items-center space-x-1">
                            {/* FIX: The Star icon component does not accept event handler props.
                                Wrapped the Star icon in a button and moved the event handlers to the button to fix the type error.
                                This is also semantically more correct and better for accessibility. */}
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    <Star 
                                        className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comments</label>
                        <textarea 
                            id="comment" 
                            rows={4} 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tell us about your experience..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={rating === 0} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">Submit Feedback</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AwaitingFeedbackCard: React.FC<{ bookings: Booking[], onRate: (booking: Booking) => void }> = ({ bookings, onRate }) => {
    if (bookings.length === 0) return null;

    return (
        <Card title="Awaiting Your Feedback">
            <div className="space-y-3">
                {bookings.map(booking => (
                    <div key={booking.id} className="bg-yellow-50 p-3 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-yellow-800">{booking.service}</p>
                            <p className="text-sm text-yellow-700">{booking.date} with {booking.technicianName}</p>
                        </div>
                        <button onClick={() => onRate(booking)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm font-semibold transition">
                            Rate Now
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    );
};


const DashboardView: React.FC<{ myBookings: Booking[], onRate: (booking: Booking) => void }> = ({ myBookings, onRate }) => {
    const upcomingBooking = myBookings.find(b => b.status === 'Scheduled');
    const awaitingFeedbackBookings = myBookings.filter(b => b.status === 'Awaiting Feedback');

    return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
             <AwaitingFeedbackCard bookings={awaitingFeedbackBookings} onRate={onRate} />

            {upcomingBooking ? (
                 <Card title="Upcoming Booking">
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">{upcomingBooking.service}</p>
                            <p className="text-gray-600">{upcomingBooking.date} at {upcomingBooking.time}</p>
                            <p className="text-sm text-gray-500">Technician: {upcomingBooking.technicianName}</p>
                        </div>
                        <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                            Reschedule
                        </button>
                    </div>
                </Card>
            ) : (
                !awaitingFeedbackBookings.length && <Card title="No Upcoming Bookings"><p>You have no scheduled services. Book a new service today!</p></Card>
            )}

            <Card title="Service History">
                <ul className="space-y-4">
                     {myBookings.filter(b => b.status === 'Completed').slice(0,4).map(booking => (
                        <li key={booking.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50">
                            <div>
                                <p className="font-semibold">{booking.service}</p>
                                <p className="text-sm text-gray-500">{booking.date}</p>
                            </div>
                            <span className={`text-sm font-medium ${statusColorMap[booking.status]}`}>{booking.status}</span>
                        </li>
                     ))}
                </ul>
            </Card>
        </div>
        
        {/* Side Column */}
        <div className="space-y-6">
            <Card>
                <ProgressBar value={350} max={500} label="Loyalty Points" />
                <p className="text-sm text-gray-500 mt-2 text-center">150 points away from a 15% discount!</p>
            </Card>
            <Card title="Monthly Spending">
                <MiniLineChart data={customerSpendingData} dataKey="spending" stroke="#14b8a6" />
            </Card>
            <Card title="Need a reminder?">
                <div className="bg-teal-50 p-4 rounded-lg text-center">
                    <p className="text-teal-800 font-semibold">It's been 6 months since your last AC cleaning.</p>
                    <button className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">Book Now</button>
                </div>
            </Card>
        </div>
    </div>
    );
};

const MyBookingsPage: React.FC<{ myBookings: Booking[] }> = ({ myBookings }) => (
    <Card title="My Bookings">
        <div className="space-y-4">
        {myBookings.map((booking: Booking) => (
            <div key={booking.id} className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                <div className="flex flex-wrap justify-between items-start">
                    <div>
                        <p className="font-bold text-lg text-gray-800">{booking.service}</p>
                        <p className="text-sm text-gray-600 font-medium">Technician: {booking.technicianName}</p>
                        <p className="text-sm text-gray-500 flex items-center mt-1"><Calendar className="w-4 h-4 mr-2" />{booking.date} at {booking.time}</p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusBgColorMap[booking.status]}`}>{booking.status}</span>
                    </div>
                </div>
            </div>
        ))}
        </div>
    </Card>
);

const FeedbackPage: React.FC<{ ratings: Rating[], onRate: (booking: Booking) => void, myBookings: Booking[] }> = ({ ratings, onRate, myBookings }) => {
    const awaitingFeedbackBookings = myBookings.filter(b => b.status === 'Awaiting Feedback');

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Submit New Feedback">
            {awaitingFeedbackBookings.length > 0 ? (
                <div className="space-y-3">
                    {awaitingFeedbackBookings.map(booking => (
                         <div key={booking.id} className="bg-yellow-50 p-3 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-yellow-800">{booking.service}</p>
                                <p className="text-sm text-yellow-700">{booking.date}</p>
                            </div>
                            <button onClick={() => onRate(booking)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm font-semibold transition">
                                Rate
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">You have no services awaiting feedback.</p>
            )}
        </Card>
        <Card title="My Past Feedback">
             <div className="space-y-4">
                {ratings.length > 0 ? ratings.map(rating => (
                    <div key={rating.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                             <p className="font-semibold">Feedback for Job #{rating.jobId}</p>
                             <div className="flex items-center my-1">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">"{rating.comment}"</p>
                    </div>
                )) : (
                    <p className="text-gray-500">You have not submitted any feedback yet.</p>
                )}
            </div>
        </Card>
    </div>
    )
};


export const CustomerDashboard: React.FC<{ 
    activePage: string; 
    bookings: Booking[];
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    ratings: Rating[];
    setRatings: React.Dispatch<React.SetStateAction<Rating[]>>;
    currentUser: { name: string };
}> = ({ activePage, bookings, setBookings, ratings, setRatings, currentUser }) => {
    const [feedbackModalBooking, setFeedbackModalBooking] = useState<Booking | null>(null);
    const myBookings = bookings.filter(b => b.customerName === currentUser.name);
    const myRatings = ratings.filter(r => r.customerName === currentUser.name);

    const handleOpenFeedbackModal = (booking: Booking) => {
        setFeedbackModalBooking(booking);
    };

    const handleCloseFeedbackModal = () => {
        setFeedbackModalBooking(null);
    };

    const handleSubmitFeedback = ({ rating, comment }: { rating: number, comment: string }) => {
        if (!feedbackModalBooking) return;

        const newRating: Rating = {
            id: `R${ratings.length + 101}`,
            jobId: feedbackModalBooking.id,
            customerName: currentUser.name,
            rating,
            comment,
            date: new Date().toISOString().split('T')[0]
        };
        setRatings(prev => [newRating, ...prev]);
        
        setBookings(prev => prev.map(b => 
            b.id === feedbackModalBooking.id ? { ...b, status: 'Completed' } : b
        ));

        handleCloseFeedbackModal();
    };


    const renderContent = () => {
        switch (activePage) {
            case 'My Bookings': return <MyBookingsPage myBookings={myBookings} />;
            case 'Feedback': return <FeedbackPage ratings={myRatings} onRate={handleOpenFeedbackModal} myBookings={myBookings} />;
            case 'Dashboard':
            default:
                return <DashboardView myBookings={myBookings} onRate={handleOpenFeedbackModal} />;
        }
    }

    return (
        <>
            {feedbackModalBooking && <FeedbackModal booking={feedbackModalBooking} onClose={handleCloseFeedbackModal} onSubmit={handleSubmitFeedback} />}
            {renderContent()}
        </>
    );
};