import React, { useState } from 'react';
import Sidebar from '../components/Admin/Sidbar';
import AdminDashboard from '../components/Admin/AdminDashboard';
import Trucks from '../components/Admin/Trucks';
import Trailers from '../components/Admin/Trailers';
import FuelLogs from '../components/Admin/FuelLog';
import MaintenanceRules from '../components/Admin/MaintenanceRules';
import MaintenanceRecords from '../components/Admin/MaintenanceRecords';
import Trips from '../components/Admin/Trips';
import Notifications from '../components/Notification';
import Tires from '../components/Admin/Tires';
import Drivers from '../components/Admin/drivers';
import Rapport from '../components/Admin/Rapport';

function Admin() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <AdminDashboard />;
      case 'trucks': return <Trucks />;
      case 'trailers': return <Trailers />;
      case 'fuelLogs': return <FuelLogs />;
      case 'maintenanceRules': return <MaintenanceRules />;
      case 'maintenanceRecords': return <MaintenanceRecords />;
      case 'trips': return <Trips />;
      case 'notifications': return <Notifications />;
      case 'tires': return <Tires />;
      case 'users': return <Drivers />;
      case 'rapport': return <Rapport />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        role="admin"
        activeMenu={activePage} 
        setActiveMenu={setActivePage} 
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default Admin;
