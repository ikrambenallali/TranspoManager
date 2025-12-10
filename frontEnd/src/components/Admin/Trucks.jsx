import React, { useState, useEffect } from 'react';
import { Truck, Gauge, Fuel, CheckCircle, Navigation, Wrench, Plus, Edit, Trash2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrucks ,createTruck ,deleteTruck } from '../../features/truckSlice';

function Trucks() {
  const dispatch = useDispatch();
  const { trucks, loading, error } = useSelector((state) => state.truck);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    matricule: '',
    marque: '',
    kilometrage: 0,
    carburantCapacity: 0,
    status: 'disponible'
  });

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

 
  useEffect(() => {
    dispatch(fetchTrucks());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    const resultAction = await dispatch(createTruck(formData));
    if (createTruck.fulfilled.match(resultAction)) {
      // Success
      setFormData({
        matricule: '',
        marque: '',
        kilometrage: 0,
        carburantCapacity: 0,
        status: 'disponible'
      });
      setIsModalOpen(false);

      // Refresh truck list
      dispatch(fetchTrucks());
    } else {
      // Error
      setFormError(resultAction.payload || 'Erreur lors de la création');
    }

    setFormLoading(false);
  };

const handleDelete = (id) => {
    dispatch(deleteTruck(id));
};
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des camions...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error}</div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "disponible": return "border-green-500 text-green-500";
      case "maintenance": return "border-yellow-500 text-yellow-500";
      case "en route": return "border-red-500 text-red-500";
      default: return "border-gray-500 text-gray-500";
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
            onClick={() => setIsModalOpen(true)}
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
                  <span className="text-sm font-medium">{truck.status}</span>
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
                  onClick={() => handleDelete(truck._id)}
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

      {/* Modal Create Truck */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                Ajouter un <span className="text-orange-500">Camion</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-5">
                {/* Matricule */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Matricule *
                  </label>
                  <input
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleChange}
                    required
                    placeholder="Ex: ABC-1234"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Marque */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Marque *
                  </label>
                  <input
                    type="text"
                    name="marque"
                    value={formData.marque}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Mercedes, Volvo, Scania"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Kilométrage */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kilométrage (km)
                  </label>
                  <input
                    type="number"
                    name="kilometrage"
                    value={formData.kilometrage}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Capacité Carburant */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Capacité Carburant (L)
                  </label>
                  <input
                    type="number"
                    name="carburantCapacity"
                    value={formData.carburantCapacity}
                    onChange={handleChange}
                    placeholder="Ex: 400"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Statut
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="en route">En Route</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Créer le Camion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trucks;