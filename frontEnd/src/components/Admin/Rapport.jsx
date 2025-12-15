import React, { useState, useEffect } from 'react';
import api from "../../../config/api";

import { 
  Truck, 
  Fuel, 
  Gauge, 
  Wrench,
  FileText,
  TrendingUp,
  Download,
  Filter,
  Search,
  Calendar,
  AlertCircle
} from 'lucide-react';

function Rapport() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('matricule');

  // Données de démonstration (à remplacer par votre API)
  useEffect(() => {
  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await api.get("/trucks/fleet-report");
        console.log("REPONSE API COMPLETE:", res.data);
        console.log("DATA:", res.data.data);

      setReportData(res.data.data);
    } catch (error) {
      console.error("Erreur chargement rapport :", error);
    } finally {
      setLoading(false);
    }
  };

  fetchReport();
}, []);


  // Calculs des totaux
  const totals = reportData.reduce((acc, truck) => ({
    totalKm: acc.totalKm + truck.totalKilometrage,
    totalFuel: acc.totalFuel + truck.totalFuel,
    totalMaintenance: acc.totalMaintenance + truck.maintenanceCount
  }), { totalKm: 0, totalFuel: 0, totalMaintenance: 0 });

  const avgConsumption = totals.totalKm > 0 
    ? (totals.totalFuel / totals.totalKm * 100).toFixed(2) 
    : 0;
console.log(totals);

  // Filtrage et tri
  const filteredData = reportData
    .filter(truck => 
      truck.matricule.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'matricule') return a.matricule.localeCompare(b.matricule);
      if (sortBy === 'km') return b.totalKilometrage - a.totalKilometrage;
      if (sortBy === 'fuel') return b.totalFuel - a.totalFuel;
      if (sortBy === 'maintenance') return b.maintenanceCount - a.maintenanceCount;
      return 0;
    });

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Rapport de <span className="text-orange-500">Flotte</span>
              </h1>
              <p className="text-gray-400">Analyse complète de votre parc de véhicules</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
                <Download size={20} />
                Exporter PDF
              </button>
              <div className="bg-gray-700/50 px-4 py-2 rounded-lg border border-gray-600">
                <p className="text-gray-400 text-sm">Date du rapport</p>
                <p className="text-white font-semibold">{new Date().toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Truck className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Nombre de Camions</h3>
              <p className="text-3xl font-bold text-white">{reportData.length}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <Gauge className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Kilométrage Total</h3>
              <p className="text-3xl font-bold text-white">{totals.totalKm.toLocaleString()} km</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <Fuel className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Consommation Totale</h3>
              <p className="text-3xl font-bold text-white">{totals.totalFuel.toLocaleString()} L</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-500 p-3 rounded-lg">
                  <Wrench className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Maintenances Totales</h3>
              <p className="text-3xl font-bold text-white">{totals.totalMaintenance}</p>
            </div>
          </div>

          {/* Average Consumption Card */}
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/50 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-4 rounded-lg">
                  <TrendingUp className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Consommation Moyenne</h3>
                  <p className="text-orange-200">Performance globale de la flotte</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-white">{avgConsumption}</p>
                <p className="text-orange-200 text-lg">L / 100 km</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par matricule..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400" size={20} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-all"
                >
                  <option value="matricule">Trier par Matricule</option>
                  <option value="km">Trier par Kilométrage</option>
                  <option value="fuel">Trier par Consommation</option>
                  <option value="maintenance">Trier par Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Report Table */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-orange-500" size={24} />
                Détails par Véhicule
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                <p className="text-gray-400 mt-4">Chargement des données...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="mx-auto text-gray-500 mb-4" size={48} />
                <p className="text-gray-400">Aucun véhicule trouvé</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Matricule</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Kilométrage Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Consommation</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Conso. Moy.</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Maintenances</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredData.map((truck) => {
                      const consumption = truck.totalKilometrage > 0 
                        ? (truck.totalFuel / truck.totalKilometrage * 100).toFixed(2) 
                        : 0;
                      
                      return (
                        <tr 
                          key={truck.truckId} 
                          className="hover:bg-gray-700/30 transition-all"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-orange-500/20 p-2 rounded-lg">
                                <Truck className="text-orange-500" size={20} />
                              </div>
                              <span className="text-white font-semibold">{truck.matricule}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Gauge className="text-purple-500" size={16} />
                              <span className="text-white">{truck.totalKilometrage.toLocaleString()} km</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Fuel className="text-green-500" size={16} />
                              <span className="text-white">{truck.totalFuel.toLocaleString()} L</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              consumption < 25 ? 'bg-green-500/20 text-green-400' :
                              consumption < 30 ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {consumption} L/100km
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Wrench className="text-yellow-500" size={16} />
                              <span className="text-white">{truck.maintenanceCount}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Rapport;