import React, { useState, useEffect } from 'react';
import { Fuel, Calendar, MapPin, Plus, Edit, Trash2, X, AlertCircle, User, Truck as TruckIcon, Route } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFuelLogs, createFuelLog, deleteFuelLog, updateFuelLog } from '../../features/fuelLogSlice';
import { fetchTrucks } from '../../features/truckSlice';
import { fetchTrips } from '../../features/tripSlice';
import { fetchDrivers } from '../../features/userSlice';

function FuelLogs() {
  const dispatch = useDispatch();
  const { fuels, loading, error } = useSelector((state) => state.fuelLog);
  const { trucks } = useSelector((state) => state.truck);
  const { trips } = useSelector((state) => state.trip);
  const { users } = useSelector((state) => state.user);
  console.log(users);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    truck: '',
    trip: '',
    driver: '',
    date: '',
    volume: '',
    kilometrageDepart: '',
    kilometrageArrivee: '',
    remarques: ''
  });

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchFuelLogs());
    dispatch(fetchTrucks());
    dispatch(fetchTrips());
    dispatch(fetchDrivers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      truck: '',
      trip: '',
      driver: '',
      date: '',
      volume: '',
      kilometrageDepart: '',
      kilometrageArrivee: '',
      remarques: ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (fuelLog) => {
    setIsEditing(true);
    setEditingId(fuelLog._id);
    setFormData({
      truck: fuelLog.truck?._id || '',
      trip: fuelLog.trip?._id || '',
      driver: fuelLog.driver?._id || '',
      date: fuelLog.date?.split('T')[0] || '',
      volume: fuelLog.volume || '',
      kilometrageDepart: fuelLog.kilometrageDepart || '',
      kilometrageArrivee: fuelLog.kilometrageArrivee || '',
      remarques: fuelLog.remarques || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    // Validation
    if (!formData.truck) {
      setFormError('Le camion est obligatoire');
      setFormLoading(false);
      return;
    }
    if (!formData.volume || formData.volume <= 0) {
      setFormError('Le volume doit être supérieur à 0');
      setFormLoading(false);
      return;
    }

    // Convertir les chaînes vides en null pour les champs optionnels
    const cleanData = {
      ...formData,
      trip: formData.trip === "" ? null : formData.trip,
      driver: formData.driver === "" ? null : formData.driver,
      kilometrageDepart: formData.kilometrageDepart === "" ? null : formData.kilometrageDepart,
      kilometrageArrivee: formData.kilometrageArrivee === "" ? null : formData.kilometrageArrivee,
      remarques: formData.remarques === "" ? null : formData.remarques,
    };

    try {
      if (isEditing) {
        await dispatch(updateFuelLog({ id: editingId, fuelData: cleanData }));
      } else {
        await dispatch(createFuelLog(cleanData));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setFormError('Une erreur est survenue');
    }

    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce journal de carburant ?')) {
      await dispatch(deleteFuelLog(id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
    setFormData({
      truck: '',
      trip: '',
      driver: '',
      date: '',
      volume: '',
      kilometrageDepart: '',
      kilometrageArrivee: '',
      remarques: ''
    });
  };

  const calculateConsumption = (fuelLog) => {
    if (fuelLog.kilometrageDepart && fuelLog.kilometrageArrivee && fuelLog.volume) {
      const distance = fuelLog.kilometrageArrivee - fuelLog.kilometrageDepart;
      if (distance > 0) {
        return (fuelLog.volume / distance * 100).toFixed(2);
      }
    }
    return null;
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des journaux de carburant...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error}</div>
    </div>
  );

  return (
    <div className="w-[110%] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Créer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Journal de <span className="text-orange-500">Carburant</span>
            </h1>
            <p className="text-gray-400">Gestion et suivi de tous les pleins de carburant</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter un Plein
          </button>
        </div>

        {/* FuelLogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(fuels) && fuels.map((fuelLog) => {
            const consumption = calculateConsumption(fuelLog);
            return (
              <div
                key={fuelLog._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                {/* FuelLog Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-500/20 p-3 rounded-lg">
                    <Fuel className="text-orange-500" size={32} />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500 text-orange-500">
                    <span className="text-lg font-bold">{fuelLog.volume}L</span>
                  </div>
                </div>

                {/* FuelLog Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {fuelLog.truck?.matricule || 'Camion non assigné'}
                    </h3>
                    {consumption && (
                      <p className="text-gray-400 text-sm">
                        Consommation: <span className="text-orange-400 font-semibold">{consumption} L/100km</span>
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-700 pt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="mr-2 text-orange-500" size={18} />
                        <span className="text-sm">Date</span>
                      </div>
                      <span className="text-white font-semibold">
                        {fuelLog.date 
                          ? new Date(fuelLog.date).toLocaleDateString('fr-FR')
                          : 'N/A'
                        }
                      </span>
                    </div>

                    {fuelLog.driver && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400">
                          <User className="mr-2 text-orange-500" size={18} />
                          <span className="text-sm">Chauffeur</span>
                        </div>
                        <span className="text-white font-semibold">
                          {fuelLog.driver?.fullname || 'N/A'}
                        </span>
                      </div>
                    )}

                    {fuelLog.trip && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400">
                          <Route className="mr-2 text-orange-500" size={18} />
                          <span className="text-sm">Voyage</span>
                        </div>
                        <span className="text-white font-semibold text-xs">
                          {fuelLog.trip?.depart || 'N/A'}
                        </span>
                      </div>
                    )}

                    {(fuelLog.kilometrageDepart || fuelLog.kilometrageArrivee) && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400">
                          <MapPin className="mr-2 text-orange-500" size={18} />
                          <span className="text-sm">Kilométrage</span>
                        </div>
                        <span className="text-white font-semibold text-xs">
                          {fuelLog.kilometrageDepart || '0'} → {fuelLog.kilometrageArrivee || '0'} km
                        </span>
                      </div>
                    )}

                    {fuelLog.remarques && fuelLog.remarques !== "no remarks" && (
                      <div className="mt-2 p-2 bg-gray-700/50 rounded-lg">
                        <p className="text-gray-300 text-xs italic">{fuelLog.remarques}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2 justify-end">
                  <button 
                    onClick={() => openEditModal(fuelLog)}
                    className="p-2 bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 text-gray-400 hover:text-orange-500 rounded-lg transition-all duration-300 group"
                    title="Modifier"
                  >
                    <Edit size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={() => handleDelete(fuelLog._id)}
                    className="p-2 bg-gray-700/50 hover:bg-red-500/20 border border-gray-600 hover:border-red-500 text-gray-400 hover:text-red-500 rounded-lg transition-all duration-300 group"
                    title="Supprimer"
                  >
                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Create/Edit FuelLog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? 'Modifier le' : 'Ajouter un'} <span className="text-orange-500">Plein</span>
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Error Message */}
              {formError && (
                <div className="mb-4 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start">
                  <AlertCircle className="text-red-400 mr-3 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-400">{formError}</p>
                </div>
              )}

              <div className="space-y-5">
                {/* Camion */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Camion <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="truck"
                    value={formData.truck}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">-- Sélectionner un camion --</option>
                    {trucks?.map((truck) => (
                      <option key={truck._id} value={truck._id}>
                        {truck.matricule}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Voyage */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Voyage (optionnel)
                  </label>
                  <select
                    name="trip"
                    value={formData.trip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">-- Aucun voyage --</option>
                    {trips?.map((trip) => (
                      <option key={trip._id} value={trip._id}>
                        {trip.depart} → {trip.destination}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chauffeur */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chauffeur (optionnel)
                  </label>
                  <select
                    name="driver"
                    value={formData.driver}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">-- Aucun chauffeur --</option>
                    {users?.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullname}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Volume (litres) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="Ex: 120"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Kilométrage Départ */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kilométrage Départ (optionnel)
                  </label>
                  <input
                    type="number"
                    name="kilometrageDepart"
                    value={formData.kilometrageDepart}
                    onChange={handleChange}
                    placeholder="Ex: 50000"
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Kilométrage Arrivée */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kilométrage Arrivée (optionnel)
                  </label>
                  <input
                    type="number"
                    name="kilometrageArrivee"
                    value={formData.kilometrageArrivee}
                    onChange={handleChange}
                    placeholder="Ex: 50500"
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Remarques */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Remarques (optionnel)
                  </label>
                  <textarea
                    name="remarques"
                    value={formData.remarques}
                    onChange={handleChange}
                    placeholder="Ex: Plein effectué à la station XYZ"
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-700">
              <button
                onClick={closeModal}
                disabled={formLoading}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={formLoading}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {formLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>{isEditing ? 'Mise à jour...' : 'Création...'}</span>
                  </>
                ) : (
                  <span>{isEditing ? 'Mettre à jour' : 'Créer le Plein'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FuelLogs;