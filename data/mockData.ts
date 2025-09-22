import { UserRole, User, KpiCardData, ServiceRequestData, RevenueData, SatisfactionData, TechnicianWorkload, Customer, Technician, Booking, Rating, Earning, Service } from '../types';
import { Users, Briefcase, Calendar, BarChart2, UserCheck, DollarSign, Clock, TrendingUp, TrendingDown, Star, MessageSquare } from '../components/icons';

export const users: Record<UserRole, User> = {
  [UserRole.ADMIN]: { name: 'Kumar Yash', role: UserRole.ADMIN, avatarUrl: 'https://i.pravatar.cc/150?u=admin' },
  [UserRole.CUSTOMER]: { name: 'Aisha Khan', role: UserRole.CUSTOMER, avatarUrl: 'https://i.pravatar.cc/150?u=customer' },
  [UserRole.TECHNICIAN]: { name: 'Vijay Nair', role: UserRole.TECHNICIAN, avatarUrl: 'https://i.pravatar.cc/150?u=tech' },
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
    { name: 'Rajesh K.', completed: 22, pending: 5 },
    { name: 'Meena D.', completed: 18, pending: 8 },
    { name: 'Amit P.', completed: 25, pending: 3 },
    { name: 'Divya R.', completed: 15, pending: 4 },
    { name: 'Sanjay G.', completed: 20, pending: 6 },
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
    { id: 1, user: 'Priya Sharma', service: 'AC Repair', status: 'Completed', time: '2 hours ago' },
    { id: 2, user: 'Rohan Mehta', service: 'Plumbing Check', status: 'Scheduled', time: '5 hours ago' },
    { id: 3, user: 'Anjali Verma', service: 'Electrical Wiring', status: 'In Progress', time: '1 day ago' },
    { id: 4, user: 'Vikram Singh', service: 'AC Installation', status: 'Completed', time: '2 days ago' },
];

export const jobListData = [
    { id: 1, customer: 'Sameer Ali', time: '09:00 AM', location: '123 Maple St', service: 'Leaky Faucet Repair', status: 'Pending' },
    { id: 2, customer: 'Fatima Begum', time: '11:30 AM', location: '456 Oak Ave', service: 'AC Filter Change', status: 'Pending' },
    { id: 3, customer: 'Ishaan Kumar', time: '02:00 PM', location: '789 Pine Ln', service: 'Switchboard Fix', status: 'Completed' },
];

// NEW DATA FOR PAGES

export const customersData: Customer[] = [
    { id: 'C001', name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '555-0101', address: '123 Main St, Anytown, USA', signupDate: '2023-01-15' },
    { id: 'C002', name: 'Rohan Mehta', email: 'rohan.mehta@example.com', phone: '555-0102', address: '456 Oak Ave, Anytown, USA', signupDate: '2023-02-20' },
    { id: 'C003', name: 'Anjali Verma', email: 'anjali.verma@example.com', phone: '555-0103', address: '789 Pine Ln, Anytown, USA', signupDate: '2023-03-10' },
    { id: 'C004', name: 'Vikram Singh', email: 'vikram.singh@example.com', phone: '555-0104', address: '101 Maple Dr, Anytown, USA', signupDate: '2023-04-05' },
    { id: 'C005', name: 'Sameer Ali', email: 'sameer.ali@example.com', phone: '555-0105', address: '212 Birch Rd, Anytown, USA', signupDate: '2023-05-21' },
    { id: 'C006', name: 'Aisha Khan', email: 'aisha.khan@example.com', phone: '555-0106', address: '321 Blossom Ct, Anytown, USA', signupDate: '2022-11-30' },
    { id: 'C007', name: 'Fatima Begum', email: 'fatima.begum@example.com', phone: '555-0107', address: '555 Pinecone Blvd, Anytown, USA', signupDate: '2023-06-11' },
    { id: 'C008', name: 'Ishaan Kumar', email: 'ishaan.kumar@example.com', phone: '555-0108', address: '789 Pine Ln, Anytown, USA', signupDate: '2023-07-01' },
    { id: 'C009', name: 'Arjun Reddy', email: 'arjun.reddy@example.com', phone: '555-0109', address: '111 Redwood Path, Anytown, USA', signupDate: '2023-07-15' },
    { id: 'C010', name: 'Sunita Patil', email: 'sunita.patil@example.com', phone: '555-0110', address: '222 Cypress Bend, Anytown, USA', signupDate: '2023-08-02' },
];

export const techniciansData: Technician[] = [
    { id: 'T01', name: 'Rajesh Kumar', specialty: 'Plumbing', rating: 4.8, jobsCompleted: 124, status: 'Available' },
    { id: 'T02', name: 'Meena Devi', specialty: 'AC', rating: 4.9, jobsCompleted: 152, status: 'Busy' },
    { id: 'T03', name: 'Amit Patel', specialty: 'Electrical', rating: 4.7, jobsCompleted: 110, status: 'Available' },
    { id: 'T04', name: 'Divya Rao', specialty: 'AC', rating: 4.8, jobsCompleted: 98, status: 'Offline' },
    { id: 'T05', name: 'Sanjay Gupta', specialty: 'Plumbing', rating: 4.6, jobsCompleted: 130, status: 'Busy' },
    { id: 'T06', name: 'Vijay Nair', specialty: 'General', rating: 4.9, jobsCompleted: 180, status: 'Available' },
];

export const bookingsData: Booking[] = [
    { id: 'B001', customerName: 'Priya Sharma', technicianName: 'Rajesh Kumar', service: 'AC Repair', date: '2024-07-26', time: '10:00 AM', status: 'Completed', customerAddress: '123 Main St, Anytown, USA', reportedIssue: 'AC unit not cooling, making strange noises.', specialInstructions: 'Please call 30 mins before arrival.' },
    { id: 'B002', customerName: 'Rohan Mehta', technicianName: 'Meena Devi', service: 'Plumbing Check', date: '2024-07-27', time: '02:00 PM', status: 'Scheduled', customerAddress: '456 Oak Ave, Anytown, USA', reportedIssue: 'Low water pressure in the master bathroom shower.', specialInstructions: 'Small dog on premises, is friendly.' },
    { id: 'B003', customerName: 'Anjali Verma', technicianName: 'Amit Patel', service: 'Electrical Wiring', date: '2024-07-27', time: '11:00 AM', status: 'In Progress', customerAddress: '789 Pine Ln, Anytown, USA', reportedIssue: 'Lights flickering in the kitchen area.', specialInstructions: 'Check the circuit breaker in the garage first.' },
    { id: 'B004', customerName: 'Vikram Singh', technicianName: 'Meena Devi', service: 'AC Installation', date: '2024-07-28', time: '09:00 AM', status: 'Scheduled', customerAddress: '101 Maple Dr, Anytown, USA', reportedIssue: 'Installation of a new 2-ton central AC unit.', specialInstructions: 'Access through the side gate.' },
    { id: 'B005', customerName: 'Aisha Khan', technicianName: 'Meena Devi', service: 'AC Tune-up Service', date: '2024-07-28', time: '10:00 AM', status: 'Scheduled', customerAddress: '321 Blossom Ct, Anytown, USA', reportedIssue: 'Annual maintenance check for the AC system.', specialInstructions: 'Please check the filters.' },
    { id: 'B006', customerName: 'Aisha Khan', technicianName: 'Rajesh Kumar', service: 'Plumbing Leak Fix', date: '2024-07-15', time: '03:00 PM', status: 'Awaiting Feedback', customerAddress: '321 Blossom Ct, Anytown, USA', reportedIssue: 'Dripping faucet in the downstairs bathroom.', specialInstructions: 'N/A' },
    { id: 'B007', customerName: 'Aisha Khan', technicianName: 'Amit Patel', service: 'Full Home Electrical Check', date: '2024-05-02', time: '01:00 PM', status: 'Completed', customerAddress: '321 Blossom Ct, Anytown, USA', reportedIssue: 'General electrical safety inspection.', specialInstructions: 'Client wants to know about surge protection options.' },
    { id: 'B008', customerName: 'Sameer Ali', technicianName: 'Vijay Nair', service: 'Leaky Faucet Repair', date: '2024-07-27', time: '09:00 AM', status: 'Scheduled', customerAddress: '212 Birch Rd, Anytown, USA', reportedIssue: 'Constant dripping from kitchen sink faucet.', specialInstructions: 'Key is under the front doormat.' },
    { id: 'B009', customerName: 'Fatima Begum', technicianName: 'Vijay Nair', service: 'AC Filter Change', date: '2024-07-27', time: '11:30 AM', status: 'Scheduled', customerAddress: '555 Pinecone Blvd, Anytown, USA', reportedIssue: 'Routine AC filter replacement needed.', specialInstructions: 'Customer has two filters for replacement.' },
    { id: 'B010', customerName: 'Ishaan Kumar', technicianName: 'Vijay Nair', service: 'Switchboard Fix', date: '2024-07-26', time: '02:00 PM', status: 'Awaiting Feedback', customerAddress: '789 Pine Ln, Anytown, USA', reportedIssue: 'One of the main switches on the board is faulty.', specialInstructions: 'Power to the main house might need to be shut off.' },
    { id: 'B011', customerName: 'Priya Sharma', technicianName: 'Meena Devi', service: 'AC Repair', date: '2024-07-20', time: '09:00 AM', status: 'Completed', customerAddress: '123 Main St, Anytown, USA', reportedIssue: 'AC making a loud humming sound.' },
    { id: 'B012', customerName: 'Rohan Mehta', technicianName: 'Rajesh Kumar', service: 'Drain Unclogging', date: '2024-07-18', time: '01:00 PM', status: 'Completed', customerAddress: '456 Oak Ave, Anytown, USA', reportedIssue: 'Kitchen sink is completely blocked.' },
    { id: 'B013', customerName: 'Sunita Patil', technicianName: 'Sanjay Gupta', service: 'Emergency Leak Repair', date: '2024-07-25', time: '08:00 PM', status: 'Completed', customerAddress: '222 Cypress Bend, Anytown, USA', reportedIssue: 'Pipe burst under the bathroom sink.' },
    { id: 'B014', customerName: 'Arjun Reddy', technicianName: 'Amit Patel', service: 'EV Charger Installation', date: '2024-07-22', time: '10:00 AM', status: 'Completed', customerAddress: '111 Redwood Path, Anytown, USA', reportedIssue: 'Install a new EV charger in the garage.' },
    { id: 'B015', customerName: 'Vikram Singh', technicianName: 'Meena Devi', service: 'Annual HVAC Tune-Up', date: '2024-07-19', time: '02:00 PM', status: 'Completed', customerAddress: '101 Maple Dr, Anytown, USA', reportedIssue: 'Standard annual checkup for the HVAC system.' },
    { id: 'B016', customerName: 'Priya Sharma', technicianName: 'Sanjay Gupta', service: 'Drain Unclogging', date: '2024-06-30', time: '11:00 AM', status: 'Completed', customerAddress: '123 Main St, Anytown, USA', reportedIssue: 'Shower drain is slow to empty.' },
    { id: 'B017', customerName: 'Aisha Khan', technicianName: 'Meena Devi', service: 'AC Repair', date: '2024-06-28', time: '04:00 PM', status: 'Completed', customerAddress: '321 Blossom Ct, Anytown, USA', reportedIssue: 'Thermostat not responding.' },
    { id: 'B018', customerName: 'Anjali Verma', technicianName: 'Vijay Nair', service: 'TV Mounting', date: '2024-07-10', time: '03:00 PM', status: 'Completed', customerAddress: '789 Pine Ln, Anytown, USA', reportedIssue: 'Mount a 65-inch TV on the living room wall.' },
    { id: 'B019', customerName: 'Rohan Mehta', technicianName: 'Meena Devi', service: 'AC Repair', date: '2024-07-05', time: '10:00 AM', status: 'Awaiting Feedback', customerAddress: '456 Oak Ave, Anytown, USA', reportedIssue: 'AC is blowing warm air.' },
    { id: 'B020', customerName: 'Sameer Ali', technicianName: 'Rajesh Kumar', service: 'Drain Unclogging', date: '2024-07-02', time: '12:00 PM', status: 'Completed', customerAddress: '212 Birch Rd, Anytown, USA', reportedIssue: 'Bathroom sink is clogged again.' },
    { id: 'B021', customerName: 'Ishaan Kumar', technicianName: 'Divya Rao', service: 'Annual HVAC Tune-Up', date: '2024-07-01', time: '09:00 AM', status: 'Completed', customerAddress: '789 Pine Ln, Anytown, USA', reportedIssue: 'Yearly maintenance.' },
];

export const technicianRatingsData: Rating[] = [
    { id: 'R01', jobId: 'B001', customerName: 'Ishaan Kumar', rating: 5, comment: 'Very professional and fixed the issue quickly!', date: '2024-07-26'},
    { id: 'R02', jobId: 'B011', customerName: 'Arjun Reddy', rating: 4, comment: 'Good work, but arrived a bit late.', date: '2024-07-24'},
    { id: 'R03', jobId: 'B012', customerName: 'Sunita Patil', rating: 5, comment: 'Vijay is the best! Highly recommend.', date: '2024-07-22'},
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
    { name: 'Meena D.', jobs: 152 }, { name: 'Sanjay G.', jobs: 130 }, { name: 'Rajesh K.', jobs: 124 },
    { name: 'Amit P.', jobs: 110 }, { name: 'Divya R.', jobs: 98 },
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