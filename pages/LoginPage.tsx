
import React from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const RoleButton: React.FC<{ role: UserRole, onClick: (role: UserRole) => void }> = ({ role, onClick }) => (
  <button
    onClick={() => onClick(role)}
    className="w-full text-lg font-semibold text-white py-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
  >
    Login as {role}
  </button>
);

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold">
              <span className="text-blue-600">Service</span><span className="text-teal-500">Flow</span>
            </h1>
            <p className="text-gray-500 mt-2">Home Service Management, Perfected.</p>
          </div>
          <div className="space-y-6">
            <RoleButton role={UserRole.ADMIN} onClick={onLogin} />
            <RoleButton role={UserRole.TECHNICIAN} onClick={onLogin} />
            <RoleButton role={UserRole.CUSTOMER} onClick={onLogin} />
          </div>
           <div className="text-center mt-8 text-sm text-gray-400">
              <p>Select a role to view the prototype dashboard.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
