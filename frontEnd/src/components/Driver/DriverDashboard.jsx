import React, { useState } from 'react';
import { 
  Route,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Fuel,
  Gauge,
  FileText,
  Calendar,
  Truck,
  PlayCircle,
  StopCircle,
  User,
  MessageSquare,
  Filter,
  TrendingUp
} from 'lucide-react';

function DriverDashboard() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Données de démonstration - à remplacer par vos vraies données Redux
  const driver = {
    name: "Ahmed Benali",
    id: "DRV-001",
    vehicle: "ABC-1234"
  };

  const trips = [
    {
      id: 1,
      origin: "Casablanca",
      destination: "Marrakech",
      date: "2024-12-15",
      status: "à faire",
      distance: "240 km",
      estimatedTime: "3h 30min",
      cargo: "Marchandises générales",
      vehicleInfo: "ABC-1234 - Volvo FH16",
      startKm: null,
      endKm: null,
      fuelVolume: null,
      remarks: ""
    },
    {
      id: 2,
      origin: "Marrakech",
      destination: "Agadir",
      date: "2024-12-14",
      status: "en cours",
      distance: "256 km",
      estimatedTime: "3h 45min",
      cargo: "Matériaux de construction",
      vehicleInfo: "ABC-1234 - Volvo FH16",
      startKm: 125840,
      endKm: null,
      fuelVolume: 85,
      remarks: ""
    },
    {
      id: 3,
      origin: "Rabat",
      destination: "Tanger",
      date: "2024-12-12",
      status: "terminé",
      distance: "280 km",
      estimatedTime: "4h",
      cargo: "Produits alimentaires",
      vehicleInfo: "ABC-1234 - Volvo FH16",
      startKm: 125320,
      endKm: 125600,
      fuelVolume: 92,
      remarks: "RAS - Livraison effectuée sans incident"
    },
    {
      id: 4,
      origin: "Fès",
      destination: "Casablanca",
      date: "2024-12-11",
      status: "terminé",
      distance: "300 km",
      estimatedTime: "4h 15min",
      cargo: "Textile",
      vehicleInfo: "ABC-1234 - Volvo FH16",
      startKm: 125020,
      endKm: 125320,
      fuelVolume: 95,
      remarks: "Trafic dense à l'arrivée"
    }
  ];

  const stats = [
    { 
      title: 'Trajets Assignés', 
      value: trips.filter(t => t.status === 'à faire').length, 
      icon: <Route size={24} />, 
      color: 'bg-blue-500'
    },
    { 
      title: 'En Cours', 
      value: trips.filter(t => t.status === 'en cours').length, 
      icon: <PlayCircle size={24} />, 
      color: 'bg-orange-500'
    },
    { 
      title: 'Terminés', 
      value: trips.filter(t => t.status === 'terminé').length, 
      icon: <CheckCircle size={24} />, 
      color: 'bg-green-500'
    },
    { 
      title: 'Total ce Mois', 
      value: trips.length, 
      icon: <TrendingUp size={24} />, 
      color: 'bg-purple-500'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'à faire': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'en cours': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'terminé': return 'bg-green-500/20 text-green-400 border-green-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'à faire': return <Clock size={16} />;
      case 'en cours': return <PlayCircle size={16} />;
      case 'terminé': return <CheckCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const handleDownloadPDF = (trip) => {
    // Logique de téléchargement PDF à implémenter
    alert(`Téléchargement du PDF pour le trajet ${trip.id}`);
  };

  const handleUpdateStatus = (tripId, newStatus) => {
    // Logique de mise à jour du statut à implémenter avec Redux
    alert(`Mise à jour du statut du trajet ${tripId} vers "${newStatus}"`);
  };

  const openDetailsModal = (trip) => {
    setSelectedTrip(trip);
    setShowDetailsModal(true);
  };

  const handleSaveTripDetails = () => {
    // Logique de sauvegarde des détails à implémenter avec Redux
    alert('Détails du trajet sauvegardés');
    setShowDetailsModal(false);
  };

  const filteredTrips = filterStatus === 'all' 
    ? trips 
    : trips.filter(trip => trip.status === filterStatus);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Mes <span className="text-orange-500">Trajets</span>
              </h1>
              <p className="text-gray-400">Bienvenue {driver.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-700/50 px-4 py-2 rounded-lg border border-gray-600">
                <p className="text-gray-400 text-sm">Véhicule assigné</p>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Truck size={16} className="text-orange-500" />
                  {driver.vehicle}
                </p>
              </div>
              <div className="bg-gray-700/50 px-4 py-2 rounded-lg border border-gray-600">
                <p className="text-gray-400 text-sm">Date</p>
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
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-4 mb-6">
            <Filter className="text-gray-400" size={20} />
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === 'all' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterStatus('à faire')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === 'à faire' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              À faire
            </button>
            <button
              onClick={() => setFilterStatus('en cours')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === 'en cours' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setFilterStatus('terminé')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === 'terminé' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Terminés
            </button>
          </div>

          {/* Trips List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300"
              >
                {/* Trip Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="text-orange-500" size={20} />
                      <h3 className="text-lg font-bold text-white">
                        {trip.origin} → {trip.destination}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(trip.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Route size={14} />
                        {trip.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {trip.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(trip.status)}`}>
                    {getStatusIcon(trip.status)}
                    {trip.status}
                  </span>
                </div>

                {/* Trip Info */}
                <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Marchandise</p>
                      <p className="text-white font-medium">{trip.cargo}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Véhicule</p>
                      <p className="text-white font-medium">{trip.vehicleInfo}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownloadPDF(trip)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Télécharger PDF
                  </button>
                  <button
                    onClick={() => openDetailsModal(trip)}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <FileText size={16} />
                    Détails / Mettre à jour
                  </button>
                </div>

                {/* Quick Status Update (for non-completed trips) */}
                {trip.status !== 'terminé' && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-gray-400 text-xs mb-2">Changer le statut:</p>
                    <div className="flex gap-2">
                      {trip.status !== 'en cours' && (
                        <button
                          onClick={() => handleUpdateStatus(trip.id, 'en cours')}
                          className="flex-1 px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500 rounded text-xs font-semibold transition-all"
                        >
                          Démarrer
                        </button>
                      )}
                      {trip.status === 'en cours' && (
                        <button
                          onClick={() => handleUpdateStatus(trip.id, 'terminé')}
                          className="flex-1 px-3 py-1.5 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-500 rounded text-xs font-semibold transition-all"
                        >
                          Terminer
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Details Modal */}
      {showDetailsModal && selectedTrip && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">
                  Détails du Trajet #{selectedTrip.id}
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Trip Summary */}
              <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="text-orange-500" size={20} />
                  <h3 className="text-lg font-bold text-white">
                    {selectedTrip.origin} → {selectedTrip.destination}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Date</p>
                    <p className="text-white font-medium">{new Date(selectedTrip.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Statut</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedTrip.status)}`}>
                      {selectedTrip.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Kilométrage Départ */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Gauge className="inline mr-2" size={16} />
                    Kilométrage Départ (km)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedTrip.startKm || ''}
                    placeholder="Ex: 125000"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    disabled={selectedTrip.status === 'terminé'}
                  />
                </div>

                {/* Kilométrage Arrivée */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Gauge className="inline mr-2" size={16} />
                    Kilométrage Arrivée (km)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedTrip.endKm || ''}
                    placeholder="Ex: 125240"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    disabled={selectedTrip.status !== 'en cours' && selectedTrip.status !== 'terminé'}
                  />
                </div>

                {/* Volume Gasoil */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Fuel className="inline mr-2" size={16} />
                    Volume Gasoil (Litres)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedTrip.fuelVolume || ''}
                    placeholder="Ex: 85"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    disabled={selectedTrip.status === 'à faire'}
                  />
                </div>

                {/* Remarques */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="inline mr-2" size={16} />
                    Remarques sur l'état du véhicule
                  </label>
                  <textarea
                    rows="4"
                    defaultValue={selectedTrip.remarks}
                    placeholder="Notez ici toute observation concernant l'état du véhicule, incidents, etc."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Status Update */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Changer le statut du trajet
                  </label>
                  <select
                    defaultValue={selectedTrip.status}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="à faire">À faire</option>
                    <option value="en cours">En cours</option>
                    <option value="terminé">Terminé</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveTripDetails}
                  className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;