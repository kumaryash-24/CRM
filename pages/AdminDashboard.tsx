import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '../components/Card';
import { adminKpiData, serviceRequestData, revenueByServiceData, customerSatisfactionData, technicianWorkloadData, recentActivity, customersData, techniciansData, customerGrowthData, topTechniciansData, serviceOfferingsData, bookingsData, technicianRatingsData } from '../data/mockData';
import { KpiCardData, Customer, Technician, Booking, Service, Rating } from '../types';
import { TrendingUp, TrendingDown, Search, Plus, MapPin, Filter, ChevronLeft, User as UserIcon, Briefcase, DollarSign, Clock, Star } from '../components/icons';
import { ServiceRequestChart, RevenueChart, SatisfactionPieChart, TechnicianWorkloadChart } from '../components/charts/Charts';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


const KpiCard: React.FC<{ data: KpiCardData }> = ({ data }) => {
    const { title, value, change, changeType, icon: Icon } = data;
    const isIncrease = changeType === 'increase';
    return (
        <Card className="flex-1 min-w-[220px]">
            <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${isIncrease ? 'bg-teal-100 text-teal-600' : 'bg-red-100 text-red-600'}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                </div>
            </div>
            <div className="mt-4 flex items-center">
                <div className={`flex items-center text-sm font-semibold ${isIncrease ? 'text-teal-600' : 'text-red-600'}`}>
                    {isIncrease ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {change}
                </div>
                <p className="text-sm text-gray-400 ml-2">vs last month</p>
            </div>
        </Card>
    )
};

const statusColorMap: { [key: string]: string } = {
    'Completed': 'bg-teal-100 text-teal-700',
    'Scheduled': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-orange-100 text-orange-700',
    'Awaiting Feedback': 'bg-yellow-100 text-yellow-700',
    'Cancelled': 'bg-red-100 text-red-700',
    'Available': 'bg-teal-100 text-teal-700',
    'Busy': 'bg-orange-100 text-orange-700',
    'Offline': 'bg-gray-200 text-gray-600',
};

const DashboardView: React.FC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {adminKpiData.map(data => <KpiCard key={data.title} data={data} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card title="Service Requests Trend">
            <ServiceRequestChart data={serviceRequestData} />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="Revenue by Service Type">
            <RevenueChart data={revenueByServiceData} />
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Customer Satisfaction">
            <SatisfactionPieChart data={customerSatisfactionData} />
          </Card>
          <Card title="Technician Workload">
            <TechnicianWorkloadChart data={technicianWorkloadData} />
          </Card>
      </div>
      <Card title="Recent Activity">
          <div>
              <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                          <th scope="col" className="px-6 py-3">Customer</th>
                          <th scope="col" className="px-6 py-3">Service</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Time</th>
                      </tr>
                  </thead>
                  <tbody>
                      {recentActivity.map((activity) => (
                          <tr key={activity.id} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{activity.user}</td>
                              <td className="px-6 py-4">{activity.service}</td>
                              <td className="px-6 py-4">
                                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[activity.status]}`}>{activity.status}</span>
                              </td>
                              <td className="px-6 py-4">{activity.time}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-gray-800">{activity.user}</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[activity.status]}`}>{activity.status}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.service}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  ))}
                </div>
          </div>
      </Card>
    </div>
);

const AddNewCustomerModal: React.FC<{ onClose: () => void; onAddCustomer: (customer: Omit<Customer, 'id' | 'signupDate'>) => void; }> = ({ onClose, onAddCustomer }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCustomer(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Address / Location</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Customer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CustomersPage: React.FC<{ onViewCustomer: (customer: Customer) => void }> = ({ onViewCustomer }) => {
    const [customers, setCustomers] = useState<Customer[]>(customersData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const initialFilters = { searchTerm: '', signupDate: '' };
    const [filters, setFilters] = useState(initialFilters);
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value }));
    };

    const resetFilters = () => setFilters(initialFilters);

    const filteredCustomers = useMemo(() => {
        return customers.filter(c => 
            (c.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || c.email.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
            (filters.signupDate ? c.signupDate >= filters.signupDate : true)
        );
    }, [filters, customers]);

    const handleAddCustomer = (newCustomer: Omit<Customer, 'id' | 'signupDate'>) => {
        const customerToAdd: Customer = {
            ...newCustomer,
            id: `C${(customers.length + 1).toString().padStart(3, '0')}`,
            signupDate: new Date().toISOString().split('T')[0],
        };
        setCustomers(prev => [customerToAdd, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen && <AddNewCustomerModal onClose={() => setIsModalOpen(false)} onAddCustomer={handleAddCustomer} />}
            <Card title="Customer Management">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="relative w-full sm:w-auto flex-grow">
                        <input type="text" placeholder="Search by name or email..." name="searchTerm" value={filters.searchTerm} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center justify-center font-semibold">
                            <Filter className="w-5 h-5 mr-2" /> Filters
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center font-semibold shrink-0">
                            <Plus className="w-5 h-5 mr-2" /> Add New Customer
                        </button>
                    </div>
                </div>

                {isFilterOpen && (
                    <div className="p-4 bg-gray-50 rounded-lg mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Signup Date After</label>
                                <input type="date" name="signupDate" value={filters.signupDate} onChange={handleFilterChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                             <button onClick={resetFilters} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Reset Filters</button>
                        </div>
                    </div>
                )}
                
                {/* Responsive Table/Card View */}
                <div>
                    {/* Table for md and up */}
                    <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Name</th><th className="px-6 py-3">Contact</th><th className="px-6 py-3">Address</th><th className="px-6 py-3">Signup Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer: Customer) => (
                                <tr key={customer.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <button onClick={() => onViewCustomer(customer)} className="text-blue-600 hover:text-blue-800 hover:underline transition">
                                            {customer.name}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>{customer.email}</div>
                                        <div className="text-xs text-gray-500">{customer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customer.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline" aria-label={`View ${customer.name}'s address on Google Maps`}>
                                            <MapPin className="w-4 h-4 mr-2 shrink-0" />
                                            <span className="truncate">{customer.address}</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">{customer.signupDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Cards for screens smaller than md */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                        {filteredCustomers.map((customer: Customer) => (
                            <div key={customer.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                <button onClick={() => onViewCustomer(customer)} className="text-blue-600 hover:text-blue-800 font-bold text-lg text-left">
                                    {customer.name}
                                </button>
                                <div className="mt-2 space-y-2 text-sm">
                                    <p className="text-gray-700">{customer.email}</p>
                                    <p className="text-gray-500">{customer.phone}</p>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customer.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start text-blue-600 hover:underline pt-1" aria-label={`View ${customer.name}'s address on Google Maps`}>
                                        <MapPin className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                                        <span>{customer.address}</span>
                                    </a>
                                    <p className="text-xs text-gray-400 pt-2">Signed up: {customer.signupDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </Card>
        </>
    );
};

const CustomerDetailsPage: React.FC<{ customer: Customer; onBack: () => void; bookings: Booking[] }> = ({ customer, onBack, bookings }) => {
    const customerBookings = bookings.filter(b => b.customerName === customer.name);
    const totalSpent = customerBookings.reduce((acc, booking) => {
        const service = serviceOfferingsData.find(s => s.name === booking.service);
        return acc + (service?.basePrice || 150);
    }, 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <button onClick={onBack} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4 transition">
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back to All Customers
                </button>
                <h2 className="text-3xl font-bold text-gray-800">Customer Details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 ring-4 ring-blue-200">
                                <UserIcon className="w-12 h-12 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
                            <p className="text-gray-500">{customer.email}</p>
                            <p className="text-gray-500">{customer.phone}</p>
                            <p className="text-sm text-gray-400 mt-2">Customer since {customer.signupDate}</p>
                        </div>
                    </Card>
                    <Card title="Location">
                        <p className="text-gray-600 mb-4">{customer.address}</p>
                         <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border">
                           <iframe
                                title="Customer Location"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(customer.address)}&output=embed`}
                                width="100%"
                                height="250"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                aria-hidden="false"
                                tabIndex={0}
                            ></iframe>
                        </div>
                    </Card>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card>
                             <div className="flex items-center">
                                <div className="p-3 rounded-full mr-4 bg-green-100 text-green-600">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Bookings</p>
                                    <p className="text-2xl font-bold text-gray-800">{customerBookings.length}</p>
                                </div>
                            </div>
                        </Card>
                         <Card>
                            <div className="flex items-center">
                                <div className="p-3 rounded-full mr-4 bg-yellow-100 text-yellow-600">
                                    <DollarSign className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Spent (Est.)</p>
                                    <p className="text-2xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card title="Booking History">
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3">Service</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Technician</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerBookings.length > 0 ? customerBookings.map(booking => (
                                        <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{booking.service}</td>
                                            <td className="px-6 py-4">{booking.date}</td>
                                            <td className="px-6 py-4">{booking.technicianName}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[booking.status]}`}>{booking.status}</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr className="hidden md:table-row">
                                            <td colSpan={4} className="text-center py-8 text-gray-500">No booking history found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                             <div className="grid grid-cols-1 gap-4 md:hidden">
                                {customerBookings.length > 0 ? customerBookings.map(booking => (
                                    <div key={booking.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <p className="font-bold text-gray-800">{booking.service}</p>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[booking.status]}`}>{booking.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">Tech: {booking.technicianName}</p>
                                    <p className="text-xs text-gray-400 pt-1">{booking.date}</p>
                                    </div>
                                )) : (
                                    <div className="md:hidden text-center py-8 text-gray-500">No booking history found.</div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};


const TechnicianDetailsPage: React.FC<{ 
    technician: Technician; 
    onBack: () => void; 
    bookings: Booking[];
    ratings: Rating[];
}> = ({ technician, onBack, bookings, ratings }) => {
    const technicianBookings = bookings.filter(b => b.technicianName === technician.name);
    
    const technicianJobIds = new Set(technicianBookings.map(b => b.id));
    const technicianRatings = ratings.filter(r => technicianJobIds.has(r.jobId));
    
    const jobsCompleted = technicianBookings.filter(b => b.status === 'Completed' || b.status === 'Awaiting Feedback').length;
    const pendingJobs = technicianBookings.filter(b => b.status === 'Scheduled' || b.status === 'In Progress').length;
    const totalEarnings = technicianBookings.reduce((acc, booking) => {
        const service = serviceOfferingsData.find(s => s.name === booking.service);
        // Using a more realistic earning model, e.g., 80% of service price
        return acc + ((service?.basePrice || 150) * 0.8);
    }, 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <button onClick={onBack} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4 transition">
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back to All Technicians
                </button>
                <h2 className="text-3xl font-bold text-gray-800">Technician Details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mb-4 ring-4 ring-teal-200">
                                <Briefcase className="w-12 h-12 text-teal-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{technician.name}</h3>
                            <p className="text-gray-500">{technician.specialty}</p>
                            <span className={`mt-2 px-3 py-1 text-sm font-semibold rounded-full ${statusColorMap[technician.status]}`}>{technician.status}</span>
                        </div>
                    </Card>
                    <Card title="Performance Metrics">
                        <ul className="space-y-4 text-sm">
                            <li className="flex justify-between items-center"><span className="text-gray-600">Average Rating</span> <span className="font-bold text-gray-800 flex items-center">{technician.rating.toFixed(1)} <Star className="w-4 h-4 ml-1 text-yellow-400" /></span></li>
                            <li className="flex justify-between items-center"><span className="text-gray-600">Total Completed Jobs</span> <span className="font-bold text-gray-800">{jobsCompleted}</span></li>
                            <li className="flex justify-between items-center"><span className="text-gray-600">Pending Jobs</span> <span className="font-bold text-gray-800">{pendingJobs}</span></li>
                            <li className="flex justify-between items-center"><span className="text-gray-600">Total Earnings (Est.)</span> <span className="font-bold text-gray-800">${totalEarnings.toFixed(2)}</span></li>
                        </ul>
                    </Card>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Job History">
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Service</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {technicianBookings.length > 0 ? technicianBookings.map(booking => (
                                        <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{booking.customerName}</td>
                                            <td className="px-6 py-4">{booking.service}</td>
                                            <td className="px-6 py-4">{booking.date}</td>
                                            <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[booking.status]}`}>{booking.status}</span></td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="text-center py-8 text-gray-500">No jobs assigned.</td></tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="grid grid-cols-1 gap-4 md:hidden">
                                {technicianBookings.length > 0 ? technicianBookings.map(booking => (
                                    <div key={booking.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-gray-800">{booking.service}</p>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[booking.status]}`}>{booking.status}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">Customer: {booking.customerName}</p>
                                        <p className="text-xs text-gray-400 pt-1">{booking.date}</p>
                                    </div>
                                )) : <div className="text-center py-8 text-gray-500">No jobs assigned.</div>}
                            </div>
                        </div>
                    </Card>

                    <Card title="Customer Feedback">
                        <div className="max-h-72 overflow-y-auto space-y-4">
                            {technicianRatings.length > 0 ? technicianRatings.map(rating => (
                                <div key={rating.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-800">{rating.customerName}</p>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 italic">"{rating.comment}"</p>
                                    <p className="text-xs text-gray-400 text-right mt-2">{rating.date}</p>
                                </div>
                            )) : <p className="text-gray-500 text-center py-4">No feedback received yet.</p>}
                        </div>
                    </Card>
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};


const TechniciansPage: React.FC<{ onViewTechnician: (technician: Technician) => void }> = ({ onViewTechnician }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const initialFilters = { specialty: '', status: '', rating: '' };
    const [filters, setFilters] = useState(initialFilters);
    
    const specialtyOptions = useMemo(() => [...new Set(techniciansData.map(t => t.specialty))], []);
    const statusOptions = useMemo(() => [...new Set(techniciansData.map(t => t.status))], []);
    const ratingOptions = { "4.5": "4.5 Stars & Up", "4.0": "4.0 Stars & Up", "0": "Any Rating" };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => setFilters(initialFilters);

    const filteredTechnicians = useMemo(() => {
        return techniciansData.filter(tech => 
            (filters.specialty ? tech.specialty === filters.specialty : true) &&
            (filters.status ? tech.status === filters.status : true) &&
            (filters.rating ? tech.rating >= parseFloat(filters.rating) : true)
        );
    }, [filters]);

    return (
        <Card title="Technician Management">
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center font-semibold">
                    <Filter className="w-5 h-5 mr-2" /> Advanced Filters
                </button>
            </div>
            {isFilterOpen && (
                 <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                            <select id="specialty" name="specialty" value={filters.specialty} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option value="">All Specialties</option>
                                {specialtyOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select id="status" name="status" value={filters.status} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option value="">All Statuses</option>
                                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                            <select id="rating" name="rating" value={filters.rating} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                {Object.entries(ratingOptions).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={resetFilters} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Reset Filters</button>
                    </div>
                </div>
            )}
            <div>
                <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Name</th><th className="px-6 py-3">Specialty</th><th className="px-6 py-3">Rating</th><th className="px-6 py-3">Jobs Completed</th><th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTechnicians.map((tech: Technician) => (
                            <tr key={tech.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                     <button onClick={() => onViewTechnician(tech)} className="text-blue-600 hover:text-blue-800 hover:underline transition text-left">
                                        {tech.name}
                                    </button>
                                </td>
                                <td className="px-6 py-4">{tech.specialty}</td>
                                <td className="px-6 py-4">{tech.rating.toFixed(1)}</td>
                                <td className="px-6 py-4">{tech.jobsCompleted}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[tech.status]}`}>{tech.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {filteredTechnicians.map((tech) => (
                        <div key={tech.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-2">
                            <div className="flex justify-between items-center">
                                 <button onClick={() => onViewTechnician(tech)} className="font-bold text-gray-800 text-left text-blue-600 hover:text-blue-800 hover:underline transition">
                                    {tech.name}
                                </button>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[tech.status]}`}>{tech.status}</span>
                            </div>
                            <p className="text-sm text-gray-600">{tech.specialty}</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Rating: <span className="font-semibold text-yellow-500">{tech.rating.toFixed(1)} ★</span></span>
                                <span className="text-gray-500">Jobs: <span className="font-semibold text-gray-700">{tech.jobsCompleted}</span></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

const AssignTaskModal: React.FC<{
    onClose: () => void;
    onAssignTask: (taskData: any) => void;
    customers: Customer[];
    technicians: Technician[];
    services: Service[];
}> = ({ onClose, onAssignTask, customers, technicians, services }) => {
    const [formData, setFormData] = useState({
        customerId: '',
        serviceId: '',
        technicianId: '',
        date: '',
        time: '',
        reportedIssue: '',
        specialInstructions: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAssignTask(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-2xl max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Assign New Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Customer</label>
                            <select name="customerId" value={formData.customerId} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select a customer</option>
                                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Service</label>
                            <select name="serviceId" value={formData.serviceId} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select a service</option>
                                {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Assign Technician</label>
                            <select name="technicianId" value={formData.technicianId} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select a technician</option>
                                {technicians.map(t => <option key={t.id} value={t.id}>{t.name} - {t.specialty}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Time</label>
                                <input type="time" name="time" value={formData.time} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reported Issue</label>
                        <textarea name="reportedIssue" value={formData.reportedIssue} onChange={handleChange} required rows={3} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Describe the customer's issue..."></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
                        <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={2} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Key under the mat, call before arriving..."></textarea>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">Assign Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const BookingsPage: React.FC<{ bookings: Booking[], setBookings: React.Dispatch<React.SetStateAction<Booking[]>> }> = ({ bookings, setBookings }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const initialFilters = { status: '', service: '', technician: '' };
    const [filters, setFilters] = useState(initialFilters);

    const serviceOptions = useMemo(() => [...new Set(bookings.map(b => b.service))].sort(), [bookings]);
    const statusOptions = useMemo(() => [...new Set(bookings.map(b => b.status))].sort(), [bookings]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value}));
    };
    
    const resetFilters = () => setFilters(initialFilters);

    const handleAssignTask = (taskData: any) => {
        const customer = customersData.find(c => c.id === taskData.customerId);
        if (!customer) return;

        const newBooking: Booking = {
            id: `B${(bookings.length + 101).toString()}`, // Prevent key collision
            customerName: customer.name,
            customerAddress: customer.address,
            technicianName: techniciansData.find(t => t.id === taskData.technicianId)?.name || 'Unassigned',
            service: serviceOfferingsData.find(s => s.id === taskData.serviceId)?.name || 'Unknown Service',
            date: taskData.date,
            time: taskData.time,
            status: 'Scheduled',
            reportedIssue: taskData.reportedIssue,
            specialInstructions: taskData.specialInstructions,
        };
        setBookings(prev => [newBooking, ...prev]);
        setIsAssignModalOpen(false);
    };

    const filteredBookings = useMemo(() => {
        return bookings.filter(booking => 
            (filters.status ? booking.status === filters.status : true) &&
            (filters.service ? booking.service === filters.service : true) &&
            (filters.technician ? booking.technicianName.toLowerCase().includes(filters.technician.toLowerCase()) : true)
        );
    }, [filters, bookings]);

    return (
        <>
        {isAssignModalOpen && <AssignTaskModal 
            onClose={() => setIsAssignModalOpen(false)} 
            onAssignTask={handleAssignTask}
            customers={customersData}
            technicians={techniciansData}
            services={serviceOfferingsData}
        />}
        <Card title="All Bookings">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                 <button onClick={() => setIsAssignModalOpen(true)} className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center font-semibold">
                    <Plus className="w-5 h-5 mr-2" /> Assign New Task
                </button>
                <div className="flex justify-end w-full sm:w-auto">
                    <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center font-semibold">
                        <Filter className="w-5 h-5 mr-2" /> Advanced Filters
                    </button>
                </div>
            </div>
            {isFilterOpen && (
                 <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select id="status" name="status" value={filters.status} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option value="">All Statuses</option>
                                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service Type</label>
                            <select id="service" name="service" value={filters.service} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option value="">All Services</option>
                                {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="technician" className="block text-sm font-medium text-gray-700">Technician Name</label>
                            <input id="technician" name="technician" type="text" value={filters.technician} onChange={handleFilterChange} placeholder="Search technician..." className="mt-1 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={resetFilters} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Reset Filters</button>
                    </div>
                </div>
            )}
            <div>
                <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Customer</th><th className="px-6 py-3">Technician</th><th className="px-6 py-3">Service</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking: Booking) => (
                            <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{booking.customerName}</td>
                                <td className="px-6 py-4">{booking.technicianName}</td>
                                <td className="px-6 py-4">{booking.service}</td>
                                <td className="px-6 py-4">{booking.date} @ {booking.time}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[booking.status]}`}>{booking.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-2">
                        <div className="flex justify-between items-start">
                            <p className="font-bold text-gray-800">{booking.customerName}</p>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[booking.status]}`}>{booking.status}</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{booking.service}</p>
                        <p className="text-sm text-gray-500">Tech: {booking.technicianName}</p>
                        <p className="text-xs text-gray-400 pt-1">{booking.date} @ {booking.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
        </>
    );
};

const ServiceOfferingsPage: React.FC = () => (
    <Card title="Manage Service Offerings">
        <div className="flex justify-end mb-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center font-semibold">
                <Plus className="w-5 h-5 mr-2" /> Add New Service
            </button>
        </div>
        <div>
            <table className="w-full text-sm text-left text-gray-500 hidden md:table">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Service Name</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Base Price</th>
                        <th className="px-6 py-3 hidden lg:table-cell">Description</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceOfferingsData.map((service: Service) => (
                        <tr key={service.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{service.name}</td>
                            <td className="px-6 py-4">{service.category}</td>
                            <td className="px-6 py-4 font-semibold text-gray-700">${service.basePrice.toFixed(2)}</td>
                            <td className="px-6 py-4 text-gray-600 max-w-sm hidden lg:table-cell">{service.description}</td>
                            <td className="px-6 py-4 flex justify-center space-x-4">
                                <button className="font-medium text-blue-600 hover:underline">Edit</button>
                                <button className="font-medium text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {serviceOfferingsData.map((service) => (
                    <div key={service.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-2">
                    <div className="flex justify-between items-start">
                        <p className="font-bold text-gray-800">{service.name}</p>
                        <p className="font-semibold text-teal-600">${service.basePrice.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full inline-block">{service.category}</p>
                    <p className="text-sm text-gray-500 pt-1">{service.description}</p>
                    <div className="flex justify-end space-x-4 pt-2 border-t mt-2">
                        <button className="font-medium text-blue-600 hover:underline">Edit</button>
                        <button className="font-medium text-red-600 hover:underline">Delete</button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </Card>
);

const AnalyticsPage: React.FC = () => {
    const analyticsData = useMemo(() => {
        const servicePriceMap = new Map(serviceOfferingsData.map(s => [s.name, s.basePrice]));

        const monthlyRevenue: { [key: string]: number } = {};
        bookingsData.forEach(booking => {
            if (booking.status === 'Completed' || booking.status === 'Awaiting Feedback') {
                const month = new Date(booking.date).toLocaleString('default', { month: 'short' });
                const price = servicePriceMap.get(booking.service) || 150;
                monthlyRevenue[month] = (monthlyRevenue[month] || 0) + price;
            }
        });
        const revenueChartData = Object.entries(monthlyRevenue)
            .map(([name, revenue]) => ({ name, revenue }))
            .slice(-6);

        const serviceCounts = bookingsData.reduce((acc, booking) => {
            acc[booking.service] = (acc[booking.service] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
        const servicePopularityChartData = Object.entries(serviceCounts)
            .map(([name, bookings]) => ({ name, bookings }))
            .sort((a, b) => b.bookings - a.bookings)
            .slice(0, 5);

        const statusCounts = bookingsData.reduce((acc, booking) => {
            acc[booking.status] = (acc[booking.status] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
        const statusDistributionChartData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

        const completedJobs = (statusCounts['Completed'] || 0) + (statusCounts['Awaiting Feedback'] || 0);
        const totalRevenue = Object.values(monthlyRevenue).reduce((sum, rev) => sum + rev, 0);
        const avgJobValue = completedJobs > 0 ? totalRevenue / completedJobs : 0;
        const pendingJobs = (statusCounts['Scheduled'] || 0) + (statusCounts['In Progress'] || 0);

        return { revenueChartData, servicePopularityChartData, statusDistributionChartData, completedJobs, avgJobValue, pendingJobs, totalRevenue };
    }, []);

    const COLORS = ['#0ea5e9', '#14b8a6', '#f97316', '#eab308', '#ef4444', '#8b5cf6'];
    
    return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">${analyticsData.totalRevenue.toLocaleString()}</p>
            </Card>
            <Card>
                <p className="text-sm text-gray-500">Avg. Job Value</p>
                <p className="text-3xl font-bold text-gray-800">${analyticsData.avgJobValue.toFixed(2)}</p>
            </Card>
            <Card>
                <p className="text-sm text-gray-500">Completed Jobs</p>
                <p className="text-3xl font-bold text-gray-800">{analyticsData.completedJobs}</p>
            </Card>
            <Card>
                <p className="text-sm text-gray-500">Pending Jobs</p>
                <p className="text-3xl font-bold text-gray-800">{analyticsData.pendingJobs}</p>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card title="Monthly Revenue Trend" className="lg:col-span-3">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.revenueChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#0ea5e9" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
             <Card title="Top 5 Service Popularity" className="lg:col-span-2">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.servicePopularityChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="bookings" name="Total Bookings" fill="#14b8a6" >
                            {analyticsData.servicePopularityChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
            <Card title="Booking Status Distribution">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={analyticsData.statusDistributionChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            innerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={2}
                        >
                            {analyticsData.statusDistributionChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ right: 0, lineHeight: '24px' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
    </div>
)};


export const AdminDashboard: React.FC<{ activePage: string; bookings: Booking[]; setBookings: React.Dispatch<React.SetStateAction<Booking[]>> }> = ({ activePage, bookings, setBookings }) => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleBackToList = () => {
        setSelectedCustomer(null);
    };

    const handleViewTechnician = (technician: Technician) => {
        setSelectedTechnician(technician);
    };

    const handleBackToTechnicianList = () => {
        setSelectedTechnician(null);
    };
    
    useEffect(() => {
        // Reset customer view when navigating to a different page in the sidebar
        if (activePage !== 'Customers') {
            setSelectedCustomer(null);
        }
        if (activePage !== 'Technicians') {
            setSelectedTechnician(null);
        }
    }, [activePage]);

    switch (activePage) {
        case 'Customers': 
            return selectedCustomer ? 
                <CustomerDetailsPage customer={selectedCustomer} onBack={handleBackToList} bookings={bookings} /> : 
                <CustomersPage onViewCustomer={handleViewCustomer} />;
        case 'Technicians': 
            return selectedTechnician ?
                <TechnicianDetailsPage technician={selectedTechnician} onBack={handleBackToTechnicianList} bookings={bookings} ratings={technicianRatingsData} /> :
                <TechniciansPage onViewTechnician={handleViewTechnician} />;
        case 'Bookings': return <BookingsPage bookings={bookings} setBookings={setBookings} />;
        case 'Services': return <ServiceOfferingsPage />;
        case 'Analytics': return <AnalyticsPage />;
        case 'Dashboard':
        default:
            return <DashboardView />;
    }
};