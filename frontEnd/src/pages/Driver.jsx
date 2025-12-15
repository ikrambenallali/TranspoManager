import React, { useState } from 'react';
import Sidebar from '../components/Admin/Sidbar'; // ✅ sidebar dynamique
import FuelLogs from '../components/Admin/FuelLog';
import Trips from '../components/Admin/Trips';

function Driver() {
  const [activePage, setActivePage] = useState('trips');

  const renderContent = () => {
    switch (activePage) {
      case 'fuelLogs':
        return <FuelLogs />;
      case 'trips':
        return <Trips />;
      default:
        return <Trips />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        role="driver"                     // ✅ IMPORTANT
        activeMenu={activePage}
        setActiveMenu={setActivePage}
      />

      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default Driver;
