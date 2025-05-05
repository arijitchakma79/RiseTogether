// src/layouts/DashboardLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from '../components';
import '../styles/dashboard/Dashboard.css'

const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard">
      <SidebarNav />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
