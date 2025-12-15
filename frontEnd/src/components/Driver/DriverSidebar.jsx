import React, { useState } from 'react';
import { Route, Fuel, Menu, X, LogOut, Truck } from 'lucide-react';

function DriverSidebar({ activeMenu, setActiveMenu }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'trips', label: 'Mes Trajets', icon: <Route size={20} /> },
    { id: 'fuelLogs', label: 'Carburant', icon: <Fuel size={20} /> },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 transition-all flex flex-col`}>
      
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {sidebarOpen && (
          <div className="flex items-center gap-2 text-white font-bold">
            <Truck /> Driver
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
              ${activeMenu === item.id 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-400 hover:bg-gray-700'
              }`}
          >
            {item.icon}
            {sidebarOpen && item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button onClick={logout} className="w-full flex items-center gap-3 text-red-400">
          <LogOut />
          {sidebarOpen && 'Déconnexion'}
        </button>
      </div>
    </aside>
  );
}

export default DriverSidebar;
