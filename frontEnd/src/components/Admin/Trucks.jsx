import React from 'react';
import { Truck, Gauge, Fuel, CheckCircle, Navigation, Wrench, Plus, Edit, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTrucks } from '../../features/truckSlice';


function Trucks() {
  const dispatch = useDispatch();
  const {trucks ,loading ,error} =useSelector((state)=>state.truck);
  useEffect(()=>{
   dispatch(fetchTrucks());
  },[])
 console.log(trucks);
 
  if(loading) return <div>Loading...</div>;
  if(error) return <div className="text-red-500">Error: {error}</div>;
const getStatusColor = (status) => {
  switch (status) {
    case "disponible": return "border-green-500 text-green-500";
    case "maintenance": return "border-yellow-500 text-yellow-500";
    case "en route": return "border-red-500 text-red-500";
    default: return "border-gray-500 text-gray-500";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "disponible": return "disponible";
    case "en route": return "en route";
    case "maintenance": return "En maintenance";
    default: return "disponible";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "disponible": return <CheckCircle size={16} className="text-green-500" />;
    case "maintenance": return <Wrench size={16} className="text-yellow-500" />;
    case "en route": return <Navigation size={16} className="text-red-500" />;
    default: return <Truck size={16} className="text-gray-500" />;
  }
};

  
  return (
    <div className="w-[110%] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Créer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Notre <span className="text-orange-500">Flotte</span>
            </h1>
            <p className="text-gray-400">Gestion et suivi de tous nos camions</p>
          </div>
          <button 
            onClick={() => console.log('Créer un camion')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter un Camion
          </button>
        </div>

        {/* Trucks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <div
              key={truck._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Truck Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <Truck className="text-orange-500" size={32} />
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(truck.status)}`}>
                  {getStatusIcon(truck.status)}
                  <span className="text-sm font-medium">{getStatusText(truck.status)}</span>
                </div>
              </div>

              {/* Truck Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{truck.matricule}</h3>
                  <p className="text-gray-400">{truck.marque || 'Marque non spécifiée'}</p>
                </div>

                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Gauge className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Kilométrage</span>
                    </div>
                    <span className="text-white font-semibold">
                      {truck.kilometrage?.toLocaleString() || 0} km
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Fuel className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Capacité Carburant</span>
                    </div>
                    <span className="text-white font-semibold">
                      {truck.carburantCapacity || 'N/A'} L
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2">
                <button 
                  onClick={() => console.log('Modifier:', truck._id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Edit size={18} />
                  Modifier
                </button>
                <button 
                  onClick={() => console.log('Supprimer:', truck._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Trucks;