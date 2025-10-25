import React, { useState } from 'react';
import { UserRole, User, Booking, Rating } from './types';
import { users, bookingsData, technicianRatingsData } from './data/mockData';
import { LoginPage } from './pages/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';                       
import { AdminDashboard } from './pages/AdminDashboard                                      
import { CustomerDashboard } from './pages/CustomerDashboard';     
import { TechnicianDashboard } from './pages/TechnicianDashboard';                              
  
const SettingsPage: React.FC = () => (
    <Card title="Settings">                    
        <div className="space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Notification Preferences</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <label htmlFor="email-notifications" className="font-medium text-gray-700">Email Notifications</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="email-notifications" id="email-notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                            <label htmlFor="email-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <label htmlFor="sms-notifications" className="font-medium text-gray-700">SMS Notifications</label>
                         <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="sms-notifications" id="sms-notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                            <label htmlFor="sms-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <label htmlFor="push-notifications" className="font-medium text-gray-700">Push Notifications</label>
                         <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="push-notifications" id="push-notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                            <label htmlFor="push-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <style>{`
            .toggle-checkbox:checked { right: 0; border-color: #10B981; }
            .toggle-checkbox:checked + .toggle-label { background-color: #10B981; }
        `}</style>
    </Card>
);


const DashboardContent: React.FC<{ 
    user: User; 
    activePage: string;
    bookings: Booking[];
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    ratings: Rating[];
    setRatings: React.Dispatch<React.SetStateAction<Rating[]>>;
}> = ({ user, activePage, bookings, setBookings, ratings, setRatings }) => {
  if (activePage === 'Settings') {
    return <SettingsPage />;
  }

  switch (user.role) {
    case UserRole.ADMIN:
      return <AdminDashboard activePage={activePage} bookings={bookings} setBookings={setBookings} />;
    case UserRole.CUSTOMER:
      return <CustomerDashboard 
                activePage={activePage} 
                bookings={bookings} 
                setBookings={setBookings} 
                ratings={ratings} 
                setRatings={setRatings}
                currentUser={user} 
            />;
    case UserRole.TECHNICIAN:
      return <TechnicianDashboard 
                activePage={activePage} 
                bookings={bookings} 
                setBookings={setBookings} 
                ratings={ratings} 
                currentUser={user}
            />;
    default:
      return <div>Dashboard not found</div>;
  }
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Lifted state
  const [bookings, setBookings] = useState<Booking[]>(bookingsData);
  const [ratings, setRatings] = useState<Rating[]>(technicianRatingsData);

  const handleLogin = (role: UserRole) => {
    setCurrentUser(users[role]);
    setActivePage('Dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
  }

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-50">
      <Sidebar 
        userRole={currentUser.role} 
        onLogout={handleLogout} 
        activePage={activePage} 
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      <div className={`h-screen flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header user={currentUser} />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50/30 p-4 sm:p-6">
          <DashboardContent 
            user={currentUser} 
            activePage={activePage}
            bookings={bookings}
            setBookings={setBookings}
            ratings={ratings}
            setRatings={setRatings}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
