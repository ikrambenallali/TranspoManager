import React, { useState } from 'react';
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

function AdminDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState('dashboard');

  // Données de démonstration
  const stats = [
    { 
      title: 'Camions Actifs', 
      value: '24', 
      icon: <Truck size={24} />, 
      color: 'bg-orange-500',
      change: '+12%'
    },
    { 
      title: 'Trajets en Cours', 
      value: '18', 
      icon: <Route size={24} />, 
      color: 'bg-blue-500',
      change: '+8%'
    },
    { 
      title: 'Maintenance Prévue', 
      value: '5', 
      icon: <Wrench size={24} />, 
      color: 'bg-yellow-500',
      change: '-3%'
    },
    { 
      title: 'Chauffeurs', 
      value: '32', 
      icon: <Users size={24} />, 
      color: 'bg-green-500',
      change: '+2'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Nouveau trajet assigné', vehicle: 'ABC-1234', time: 'Il y a 5 min', status: 'success' },
    { id: 2, action: 'Maintenance programmée', vehicle: 'XYZ-9876', time: 'Il y a 15 min', status: 'warning' },
    { id: 3, action: 'Trajet terminé', vehicle: 'DEF-5555', time: 'Il y a 1h', status: 'success' },
    { id: 4, action: 'Alerte pneu usé', vehicle: 'GHI-7890', time: 'Il y a 2h', status: 'error' }
  ];

  const maintenanceAlerts = [
    { id: 1, type: 'Vidange', vehicle: 'ABC-1234', dueDate: '2024-12-20', priority: 'high' },
    { id: 2, type: 'Révision', vehicle: 'XYZ-9876', dueDate: '2024-12-25', priority: 'medium' },
    { id: 3, type: 'Pneus', vehicle: 'DEF-5555', dueDate: '2024-12-18', priority: 'high' }
  ];

//   const menuItems = [
//     { id: 'dashboard', label: 'Tableau de Bord', icon: <LayoutDashboard size={20} /> },
//     { id: 'trucks', label: 'Camions', icon: <Truck size={20} /> },
//     { id: 'trailers', label: 'Remorques', icon: <Container size={20} /> },
//     { id: 'tires', label: 'Pneus', icon: <CircleDot size={20} /> },
//     { id: 'routes', label: 'Trajets', icon: <Route size={20} /> },
//     { id: 'drivers', label: 'Chauffeurs', icon: <Users size={20} /> },
//     { id: 'Rapport', label: 'Rapports', icon: <FileText size={20} /> },
//     { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> }
//   ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 border-red-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'error': return <AlertTriangle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };
 
  return (
    <div className=" flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      
    

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Tableau de <span className="text-orange-500">Bord</span>
              </h1>
              <p className="text-gray-400">Bienvenue dans votre espace administrateur</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-700/50 px-4 py-2 rounded-lg border border-gray-600">
                <p className="text-gray-400 text-sm">Date du jour</p>
                <p className="text-white font-semibold">{new Date().toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Two Columns Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent Activities */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-orange-500" size={24} />
                  Activités Récentes
                </h2>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-orange-500 transition-all"
                  >
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-sm">Véhicule: {activity.vehicle}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Alerts */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Wrench className="text-orange-500" size={24} />
                  Alertes Maintenance
                </h2>
              </div>
              <div className="space-y-4">
                {maintenanceAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 bg-gray-700/30 rounded-lg border ${getPriorityColor(alert.priority)} hover:border-orange-500 transition-all`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{alert.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(alert.priority)}`}>
                        {alert.priority === 'high' ? 'Urgent' : alert.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Véhicule: {alert.vehicle}</span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar size={14} />
                        <span>{new Date(alert.dueDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300">
                Voir toutes les alertes
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Fuel className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Consommation Totale</p>
                  <p className="text-2xl font-bold text-white">12,450 L</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Gauge className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Kilométrage Total</p>
                  <p className="text-2xl font-bold text-white">156,890 km</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Trajets Complétés</p>
                  <p className="text-2xl font-bold text-white">1,248</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;