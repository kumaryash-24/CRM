import { UserRole, User, KpiCardData, ServiceRequestData, RevenueData, SatisfactionData, TechnicianWorkload, Customer, Technician, Booking, Rating, Earning, Service } from '../types';
import { Users, Briefcase, Calendar, BarChart2, UserCheck, DollarSign, Clock, TrendingUp, TrendingDown, Star, MessageSquare } from '../components/icons';

export const users: Record<UserRole, User> = {
  [UserRole.ADMIN]: { name: 'Alex Johnson', role: UserRole.ADMIN, avatarUrl: 'https://i.pravatar.cc/150?u=admin' },
  [UserRole.CUSTOMER]: { name: 'Samantha Bee', role: UserRole.CUSTOMER, avatarUrl: 'https://i.pravatar.cc/150?u=customer' },
  [UserRole.TECHNICIAN]: { name: 'Mike Rodriguez', role: UserRole.TECHNICIAN, avatarUrl: 'https://i.pravatar.cc/150?u=tech' },
};

export const adminKpiData: KpiCardData[] = [
  { title: 'Total Customers', value: '1,254', change: '+12.5%', changeType: 'increase', icon: Users },
  { title: 'Active Technicians', value: '78', change: '+5.2%', changeType: 'increase', icon: UserCheck },
  { title: 'Today\'s Bookings', value: '112', change: '-3.1%', changeType: 'decrease', icon: Calendar },
  { title: 'Total Revenue', value: '$89,430', change: '+8.7%', changeType: 'increase', icon: DollarSign },
];

export const serviceRequestData: ServiceRequestData[] = [
  { name: 'Jan', requests: 250 },
  { name: 'Feb', requests: 300 },
  { name: 'Mar', requests: 450 },
  { name: 'Apr', requests: 400 },
  { name: 'May', requests: 550 },
  { name: 'Jun', requests: 620 },
  { name: 'Jul', requests: 710 },
];

export const revenueByServiceData: RevenueData[] = [
  { name: 'AC', revenue: 42000 },
  { name: 'Plumbing', revenue: 28000 },
  { name: 'Electrical', revenue: 19430 },
];

export const customerSatisfactionData: SatisfactionData[] = [
  { name: 'Excellent', value: 450 },
  { name: 'Good', value: 210 },
  { name: 'Poor', value: 45 },
];

export const technicianWorkloadData: TechnicianWorkload[] = [
    { name: 'John D.', completed: 22, pending: 5 },
    { name: 'Sarah W.', completed: 18, pending: 8 },
    { name: 'David C.', completed: 25, pending: 3 },
    { name: 'Emily R.', completed: 15, pending: 4 },
    { name: 'Chris L.', completed: 20, pending: 6 },
];

export const customerSpendingData = [
  { name: 'Jan', spending: 150 },
  { name: 'Mar', spending: 250 },
  { name: 'May', spending: 180 },
  { name: 'Jul', spending: 320 },
];

export const technicianEarningsData = [
  { name: 'Week 1', earnings: 850 },
  { name: 'Week 2', earnings: 1100 },
  { name: 'Week 3', earnings: 920 },
  { name: 'Week 4', earnings: 1250 },
];

export const recentActivity = [
    { id: 1, user: 'Jane Cooper', service: 'AC Repair', status: 'Completed', time: '2 hours ago' },
    { id: 2, user: 'Cody Fisher', service: 'Plumbing Check', status: 'Scheduled', time: '5 hours ago' },
    { id: 3, user: 'Esther Howard', service: 'Electrical Wiring', status: 'In Progress', time: '1 day ago' },
    { id: 4, user: 'Jenny Wilson', service: 'AC Installation', status: 'Completed', time: '2 days ago' },
];

export const jobListData = [
    { id: 1, customer: 'Robert Fox', time: '09:00 AM', location: '123 Maple St', service: 'Leaky Faucet Repair', status: 'Pending' },
    { id: 2, customer: 'Darlene Robertson', time: '11:30 AM', location: '456 Oak Ave', service: 'AC Filter Change', status: 'Pending' },
    { id: 3, customer: 'Annette Black', time: '02:00 PM', location: '789 Pine Ln', service: 'Switchboard Fix', status: 'Completed' },
];

// NEW DATA FOR PAGES

export const customersData: Customer[] = [
    { id: 'C001', name: 'Jane Cooper', email: 'jane.cooper@example.com', phone: '555-0101', address: '123 Main St, Anytown, USA', signupDate: '2023-01-15' },
    { id: 'C002', name: 'Cody Fisher', email: 'cody.fisher@example.com', phone: '555-0102', address: '456 Oak Ave, Anytown, USA', signupDate: '2023-02-20' },
    { id: 'C003', name: 'Esther Howard', email: 'esther.howard@example.com', phone: '555-0103', address: '789 Pine Ln, Anytown, USA', signupDate: '2023-03-10' },
    { id: 'C004', name: 'Jenny Wilson', email: 'jenny.wilson@example.com', phone: '555-0104', address: '101 Maple Dr, Anytown, USA', signupDate: '2023-04-05' },
    { id: 'C005', name: 'Robert Fox', email: 'robert.fox@example.com', phone: '555-0105', address: '212 Birch Rd, Anytown, USA', signupDate: '2023-05-21' },
    { id: 'C006', name: 'Samantha Bee', email: 'samantha.bee@example.com', phone: '555-0106', address: '321 Blossom Ct, Anytown, USA', signupDate: '2022-11-30' },
];

export const techniciansData: Technician[] = [
    { id: 'T01', name: 'John D.', specialty: 'Plumbing', rating: 4.8, jobsCompleted: 124, status: 'Available' },
    { id: 'T02', name: 'Sarah W.', specialty: 'AC', rating: 4.9, jobsCompleted: 152, status: 'Busy' },
    { id: 'T03', name: 'David C.', specialty: 'Electrical', rating: 4.7, jobsCompleted: 110, status: 'Available' },
    { id: 'T04', name: 'Emily R.', specialty: 'AC', rating: 4.8, jobsCompleted: 98, status: 'Offline' },
    { id: 'T05', name: 'Chris L.', specialty: 'Plumbing', rating: 4.6, jobsCompleted: 130, status: 'Busy' },
    { id: 'T06', name: 'Mike Rodriguez', specialty: 'General', rating: 4.9, jobsCompleted: 180, status: 'Available' },
];

export const bookingsData: Booking[] = [
    { id: 'B001', customerName: 'Jane Cooper', technicianName: 'John D.', service: 'AC Repair', date: '2024-07-26', time: '10:00 AM', status: 'Completed', customerAddress: '123 Main St, Anytown, USA', reportedIssue: 'AC unit not cooling, making strange noises.', specialInstructions: 'Please call 30 mins before arrival.' },
    { id: 'B002', customerName: 'Cody Fisher', technicianName: 'Sarah W.', service: 'Plumbing Check', date: '2024-07-27', time: '02:00 PM', status: 'Scheduled', customerAddress: '456 Oak Ave, Anytown, USA', reportedIssue: 'Low water pressure in the master bathroom shower.', specialInstructions: 'Small dog on premises, is friendly.' },
    { id: 'B003', customerName: 'Esther Howard', technicianName: 'David C.', service: 'Electrical Wiring', date: '2024-07-27', time: '11:00 AM', status: 'In Progress', customerAddress: '789 Pine Ln, Anytown, USA', reportedIssue: 'Lights flickering in the kitchen area.', specialInstructions: 'Check the circuit breaker in the garage first.' },
    { id: 'B004', customerName: 'Jenny Wilson', technicianName: 'Sarah W.', service: 'AC Installation', date: '2024-07-28', time: '09:00 AM', status: 'Scheduled', customerAddress: '101 Maple Dr, Anytown, USA', reportedIssue: 'Installation of a new 2-ton central AC unit.', specialInstructions: 'Access through the side gate.' },
    { id: 'B005', customerName: 'Samantha Bee', technicianName: 'Sarah W.', service: 'AC Tune-up Service', date: '2024-07-28', time: '10:00 AM', status: 'Scheduled', customerAddress: '321 Blossom Ct, Anytown, USA', reportedIssue: 'Annual maintenance check for the AC system.', specialInstructions: 'Please check the filters.' },
    { id: 'B006', customerName: 'Samantha Bee', technicianName: 'John D.', service: 'Plumbing Leak Fix', date: '2024-07-15', time: '03:00 PM', status: 'Awaiting Feedback', customerAddress: '321 Blossom Ct, Anytown, USA', reportedIssue: 'Dripping faucet in the downstairs bathroom.', specialInstructions: 'N/A' },
    { id: 'B007', customerName: 'Samantha Bee', technicianName: 'David C.', service: 'Full Home Electrical Check', date: '2024-05-02', time: '01:00 PM', status: 'Completed', customerAddress: '321 Blossom Ct, Anytown, USA', reportedIssue: 'General electrical safety inspection.', specialInstructions: 'Client wants to know about surge protection options.' },
    { id: 'B008', customerName: 'Robert Fox', technicianName: 'Mike Rodriguez', service: 'Leaky Faucet Repair', date: '2024-07-27', time: '09:00 AM', status: 'Scheduled', customerAddress: '212 Birch Rd, Anytown, USA', reportedIssue: 'Constant dripping from kitchen sink faucet.', specialInstructions: 'Key is under the front doormat.' },
    { id: 'B009', customerName: 'Darlene Robertson', technicianName: 'Mike Rodriguez', service: 'AC Filter Change', date: '2024-07-27', time: '11:30 AM', status: 'Scheduled', customerAddress: '555 Pinecone Blvd, Anytown, USA', reportedIssue: 'Routine AC filter replacement needed.', specialInstructions: 'Customer has two filters for replacement.' },
    { id: 'B010', customerName: 'Annette Black', technicianName: 'Mike Rodriguez', service: 'Switchboard Fix', date: '2024-07-26', time: '02:00 PM', status: 'Awaiting Feedback', customerAddress: '789 Pine Ln, Anytown, USA', reportedIssue: 'One of the main switches on the board is faulty.', specialInstructions: 'Power to the main house might need to be shut off.' },
];

export const technicianRatingsData: Rating[] = [
    { id: 'R01', jobId: 'B001', customerName: 'Annette Black', rating: 5, comment: 'Very professional and fixed the issue quickly!', date: '2024-07-26'},
    { id: 'R02', jobId: 'B011', customerName: 'Guy Hawkins', rating: 4, comment: 'Good work, but arrived a bit late.', date: '2024-07-24'},
    { id: 'R03', jobId: 'B012', customerName: 'Kristin Watson', rating: 5, comment: 'Mike is the best! Highly recommend.', date: '2024-07-22'},
];

export const technicianEarningsDetails: Earning[] = [
    { jobId: 'B010', service: 'Switchboard Fix', date: '2024-07-26', amount: 150.00 },
    { jobId: 'B011', service: 'Drain Cleaning', date: '2024-07-24', amount: 120.50 },
    { jobId: 'B012', service: 'AC Maintenance', date: '2024-07-22', amount: 250.00 },
];

export const customerGrowthData = [
    { name: 'Jan', newCustomers: 30 }, { name: 'Feb', newCustomers: 45 }, { name: 'Mar', newCustomers: 60 },
    { name: 'Apr', newCustomers: 55 }, { name: 'May', newCustomers: 75 }, { name: 'Jun', newCustomers: 90 },
];

export const topTechniciansData = [
    { name: 'Sarah W.', jobs: 152 }, { name: 'Chris L.', jobs: 130 }, { name: 'John D.', jobs: 124 },
    { name: 'David C.', jobs: 110 }, { name: 'Emily R.', jobs: 98 },
];

export const serviceOfferingsData: Service[] = [
    { id: 'S001', name: 'Emergency Leak Repair', category: 'Plumbing', description: '24/7 rapid response for burst pipes and major leaks.', basePrice: 250 },
    { id: 'S002', name: 'Drain Unclogging', category: 'Plumbing', description: 'Professional cleaning of clogged kitchen, bathroom, and main line drains.', basePrice: 150 },
    { id: 'S003', name: 'Annual HVAC Tune-Up', category: 'HVAC', description: 'Comprehensive inspection and maintenance of your heating and cooling system.', basePrice: 200 },
    { id: 'S004', name: 'AC Repair', category: 'HVAC', description: 'Diagnosis and repair of all major air conditioner brands.', basePrice: 180 },
    { id: 'S005', name: 'Smart Thermostat Installation', category: 'Electrical', description: 'Installation and setup of smart home thermostats like Nest, Ecobee.', basePrice: 120 },
    { id: 'S006', name: 'EV Charger Installation', category: 'Electrical', description: 'Home installation of Level 2 electric vehicle charging stations.', basePrice: 700 },
    { id: 'S007', name: 'Dishwasher Repair', category: 'Appliance Repair', description: 'Repair services for common dishwasher issues like not draining or cleaning.', basePrice: 130 },
    { id: 'S008', name: 'TV Mounting', category: 'Handyman', description: 'Secure mounting of flat-screen TVs to any wall type, with wire concealment.', basePrice: 100 },
];