// FIX: Import React to use React types like React.ComponentType.
import React from 'react';

export enum UserRole {     
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
  TECHNICIAN = 'Technician',
}        

export interface User {
  name: string;
  role: UserRole;
  avatarUrl: string;
}

export interface KpiCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

export interface ServiceRequestData {
  name: string;
  requests: number;
}

export interface RevenueData {
  name: string;
  revenue: number;
}

export interface SatisfactionData {
  name: string;
  value: number;
}

export interface TechnicianWorkload {
  name: string;
  completed: number;
  pending: number;
}

// New Types for Pages
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    signupDate: string;
}

export interface Technician {
    id: string;
    name: string;
    specialty: 'AC' | 'Plumbing' | 'Electrical' | 'General';
    rating: number;
    jobsCompleted: number;
    status: 'Available' | 'Busy' | 'Offline';
}

export interface Booking {
    id: string;
    customerName: string;
    technicianName: string;
    service: string;
    date: string;
    time: string;
    status: 'Completed' | 'Scheduled' | 'Cancelled' | 'In Progress' | 'Awaiting Feedback';
    customerAddress: string;
    reportedIssue: string;
    specialInstructions?: string;
}

export interface Rating {
    id: string;
    jobId: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Earning {
    jobId: string;
    service: string;
    date: string;
    amount: number;
}

export interface Service {
    id: string;
    name: string;
    category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance Repair' | 'Handyman';
    description: string;
    basePrice: number;
}
