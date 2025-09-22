import React from 'react';
import { UserRole } from '../types';
import { LayoutDashboard, Users, Briefcase, Calendar, BarChart2, Settings, LogOut, Star, MessageSquare, Wrench } from './icons';

interface SidebarProps {
  userRole: UserRole;
  onLogout: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
}

const adminNav = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Customers', icon: Users },
  { name: 'Technicians', icon: Briefcase },
  { name: 'Bookings', icon: Calendar },
  { name: 'Services', icon: Wrench },
  { name: 'Analytics', icon: BarChart2 },
];

const customerNav = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'My Bookings', icon: Calendar },
  { name: 'Feedback', icon: MessageSquare },
];

const technicianNav = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'My Jobs', icon: Briefcase },
  { name: 'Earnings', icon: BarChart2 },
  { name: 'My Ratings', icon: Star },
];

const navItems = {
  [UserRole.ADMIN]: adminNav,
  [UserRole.CUSTOMER]: customerNav,
  [UserRole.TECHNICIAN]: technicianNav,
};

export const Sidebar: React.FC<SidebarProps> = ({ userRole, onLogout, activePage, onNavigate }) => {
  const currentNav = navItems[userRole];

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col h-screen fixed shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-gray-200">
        <span className="text-blue-600">Service</span><span className="text-teal-500">Flow</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {currentNav.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            className={`w-full flex items-center px-4 py-3 text-md font-medium rounded-lg transition-colors duration-200 text-left ${
              activePage === item.name
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('Settings')}
          className={`w-full flex items-center px-4 py-3 text-md font-medium rounded-lg transition-colors duration-200 text-left ${
            activePage === 'Settings'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-md font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 mt-2"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};