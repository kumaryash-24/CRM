
import React from 'react';
import { UserRole } from '../types';
import { LayoutDashboard, Users, Briefcase, Calendar, BarChart2, Settings, LogOut, Star, MessageSquare, Wrench, ChevronLeft, ChevronRight, X } from './icons';

interface SidebarProps {
  userRole: UserRole;
  onLogout: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
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

export const Sidebar: React.FC<SidebarProps> = ({ userRole, onLogout, activePage, onNavigate, isCollapsed, onToggle }) => {
  const currentNav = navItems[userRole];

  return (
    <>
      <aside
        className={`bg-white text-gray-800 flex flex-col h-screen fixed shadow-lg z-40 transition-all duration-300 ease-in-out 
          ${isCollapsed ? 'w-20' : 'w-64'}`
        }
      >
        <div className={`text-2xl font-bold border-b border-gray-200 transition-all duration-300 flex items-center ${isCollapsed ? 'py-4 justify-center' : 'p-6'}`}>
           <div className="flex items-center">
                <span className="text-blue-600">S</span>
                <span className={`font-bold inline ${isCollapsed ? "hidden" : ""}`}>Flow</span>
            </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {currentNav.map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center px-4 py-3 text-md font-medium rounded-lg transition-colors duration-200 text-left ${
                isCollapsed ? 'justify-center' : ''
              } ${
                activePage === item.name
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={item.name}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`inline ${isCollapsed ? "hidden" : ""}`}>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={() => onNavigate('Settings')}
            className={`w-full flex items-center px-4 py-3 text-md font-medium rounded-lg transition-colors duration-200 text-left ${
              isCollapsed ? 'justify-center' : ''
            } ${
              activePage === 'Settings'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title="Settings"
          >
            <Settings className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
            <span className={`inline ${isCollapsed ? "hidden" : ""}`}>Settings</span>
          </button>
          <button
            onClick={onLogout}
            className={`w-full flex items-center px-4 py-3 text-md font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 mt-2 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Logout"
          >
            <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
            <span className={`inline ${isCollapsed ? "hidden" : ""}`}>Logout</span>
          </button>
        </div>
        <button
          onClick={onToggle}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white text-gray-600 border border-gray-200 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
      </aside>
    </>
  );
};
