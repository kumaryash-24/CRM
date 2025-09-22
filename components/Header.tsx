
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-sm text-gray-500">Here's what's happening today.</p>
          </div>
          <div className="flex items-center">
            <div className="text-right mr-4">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-teal-600 font-medium">{user.role}</p>
            </div>
            <img className="h-12 w-12 rounded-full object-cover" src={user.avatarUrl} alt="User avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};
