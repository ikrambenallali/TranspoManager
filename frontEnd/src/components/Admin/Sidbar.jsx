import React from 'react'
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Container, 
  CircleDot, 
  Route, 
  FileText, 
  Settings, 
  Users,
  Menu,
  X,
  TrendingUp,
  Gauge,
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  LogOut
} from 'lucide-react';

function Sidbar({ activeMenu, setActiveMenu }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

     const menuItems = [
        { id: 'dashboard', label: 'Tableau de Bord', icon: <LayoutDashboard size={20} /> },
        { id: 'trucks', label: 'Camions', icon: <Truck size={20} /> },
        { id: 'trailers', label: 'Remorques', icon: <Container size={20} /> },
        { id: 'tires', label: 'Pneus', icon: <CircleDot size={20} /> },
        { id: 'trips', label: 'Trajets', icon: <Route size={20} /> },
        {id: 'maintenanceRules', label: 'maintenanceRules', icon: <Wrench size={20} />},
        {id: 'maintenanceRecords', label: 'maintenanceRecords', icon: <Wrench size={20} />},
        { id: 'users', label: 'Chauffeurs', icon: <Users size={20} /> },
        // { id: 'reports', label: 'Rapports', icon: <FileText size={20} /> },
        // { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> }
      ];
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      };
  return (
    <>
      {/* Sidebar */}
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 transition-all duration-300 flex flex-col`}>
        
        {/* Logo & Toggle */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Truck className="text-white" size={24} />
              </div>
              <span className="text-white font-bold text-lg">Admin Panel</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeMenu === item.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            {item.icon}
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
         <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300">
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        
        </div>
      </aside>
    </>
  )
}

export default Sidbar