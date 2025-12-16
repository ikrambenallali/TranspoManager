import React, { useState, useEffect } from 'react';
import { Truck, Calendar, MapPin, Plus, Edit, Trash2, X, AlertCircle, User, Navigation, Gauge, Fuel, FileText } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips, createTrip, deleteTrip, updateTrip, updateTripStatus } from '../../features/tripSlice';
import { fetchTrucks } from '../../features/truckSlice';
import { fetchtrailers } from '../../features/trailerSlice';
import { fetchDrivers } from '../../features/userSlice';
import { loadUser } from "../../features/authSlice";
import {downloadTripPdf } from '../../features/tripSlice';


function Trips() {
  const dispatch = useDispatch();
  const { trips, loading, error,pdfLoading  } = useSelector((state) => state.trips);
  const { trucks } = useSelector((state) => state.truck);
  const { trailers } = useSelector((state) => state.trailer);
  const { users } = useSelector((state) => state.user);
  const { user: currentUser } = useSelector((state) => state.auth);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    truck: '',
    trailer: '',
    driver: '',
    startLocation: '',
    endLocation: '',
    startDate: '',
    endDate: '',
    status: 'à faire',
    kilometrageDepart: '',
    carburantDepart: '',
    kilometrageArrivee: '',
    carburantArrivee: '',
    remarks: ''
  });

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const isAdmin = currentUser?.role === 'admin';
  const isDriver = currentUser?.role === 'driver';

  useEffect(() => {
    dispatch(fetchTrips());
    dispatch(fetchTrucks());
    dispatch(fetchtrailers());
    dispatch(fetchDrivers());
    dispatch(loadUser());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    if (!isAdmin) {
      alert('Seul un administrateur peut créer un voyage');
      return;
    }
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      truck: '',
      trailer: '',
      driver: '',
      startLocation: '',
      endLocation: '',
      startDate: '',
      endDate: '',
      status: 'à faire',
      kilometrageDepart: '',
      carburantDepart: '',
      kilometrageArrivee: '',
      carburantArrivee: '',
      remarks: ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (trip) => {
    setIsEditing(true);
    setEditingId(trip._id);
    setFormData({
      title: trip.title || '',
      truck: trip.truck?._id || '',
      trailer: trip.trailer?._id || '',
      driver: trip.driver?._id || '',
      startLocation: trip.startLocation || '',
      endLocation: trip.endLocation || '',
      startDate: trip.startDate?.split('T')[0] || '',
      endDate: trip.endDate?.split('T')[0] || '',
      status: trip.status || 'à faire',
      kilometrageDepart: trip.kilometrageDepart || '',
      carburantDepart: trip.carburantDepart || '',
      kilometrageArrivee: trip.kilometrageArrivee || '',
      carburantArrivee: trip.carburantArrivee || '',
      remarks: trip.remarks || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    // Validation selon le rôle
    if (isAdmin) {
      if (!formData.startDate) {
        setFormError('La date de départ est obligatoire');
        setFormLoading(false);
        return;
      }
      if (formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
        setFormError("La date d'arrivée doit être après la date de départ");
        setFormLoading(false);
        return;
      }
    }

    // Préparer les données selon le rôle
    let dataToSend = {};
    
    if (isAdmin) {
      // Admin peut modifier tous les champs admin
      dataToSend = {
        title: formData.title || undefined,
        truck: formData.truck || undefined,
        trailer: formData.trailer || undefined,
        driver: formData.driver || undefined,
        startLocation: formData.startLocation || undefined,
        endLocation: formData.endLocation || undefined,
        startDate: formData.startDate || undefined,
        status: formData.status || undefined,
        kilometrageDepart: formData.kilometrageDepart || undefined,
        carburantDepart: formData.carburantDepart || undefined,
        remarks: formData.remarks || undefined
      };
    } else if (isDriver) {
      // Driver peut seulement modifier les champs driver
      dataToSend = {
        kilometrageArrivee: formData.kilometrageArrivee || undefined,
        carburantArrivee: formData.carburantArrivee || undefined,
        endDate: formData.endDate || undefined,
        status: formData.status || undefined,
        remarks: formData.remarks || undefined
      };
    }

    // Supprimer les undefined
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === undefined || dataToSend[key] === '') {
        delete dataToSend[key];
      }
    });

    try {
      if (isEditing) {
        await dispatch(updateTrip({ id: editingId, data: dataToSend })).unwrap();
      } else {
        await dispatch(createTrip(dataToSend)).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setFormError(error || 'Une erreur est survenue');
    }

    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Seul un administrateur peut supprimer un voyage');
      return;
    }
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      await dispatch(deleteTrip(id));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await dispatch(updateTripStatus({ id, status: newStatus })).unwrap();
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
    setFormData({
      title: '',
      truck: '',
      trailer: '',
      driver: '',
      startLocation: '',
      endLocation: '',
      startDate: '',
      endDate: '',
      status: 'à faire',
      kilometrageDepart: '',
      carburantDepart: '',
      kilometrageArrivee: '',
      carburantArrivee: '',
      remarks: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "à faire": return "border-yellow-500 text-yellow-500";
      case "en cours": return "border-blue-500 text-blue-500";
      case "terminé": return "border-green-500 text-green-500";
      default: return "border-gray-500 text-gray-500";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "à faire": return "bg-yellow-500/20";
      case "en cours": return "bg-blue-500/20";
      case "terminé": return "bg-green-500/20";
      default: return "bg-gray-500/20";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "à faire": return "à faire";
      case "en cours": return "En cours";
      case "terminé": return "Terminé";
      default: return status;
    }
  };

const visibleTrips = React.useMemo(() => {
  if (!Array.isArray(trips)) return [];

  if (isAdmin) return trips;

  if (isDriver && currentUser?.id) {
    return trips.filter(
      (trip) => String(trip.driver?._id) === String(currentUser.id)
    );
  }
  return [];
}, [trips, isAdmin, isDriver, currentUser]);


  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des voyages...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error}</div>
    </div>
  );

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Créer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Nos <span className="text-orange-500">Voyages</span>
            </h1>
            <p className="text-gray-400">Gestion et suivi de tous les voyages</p>
          </div>
          {isAdmin && (
            <button 
              onClick={openCreateModal}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Plus size={20} />
              Ajouter un Voyage
            </button>
          )}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{visibleTrips.map((trip) => (
            <div
              key={trip._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Trip Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${getStatusBgColor(trip.status)} p-3 rounded-lg`}>
                  <Navigation className="text-orange-500" size={32} />
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(trip.status)}`}>
                  <span className="text-sm font-medium">{getStatusLabel(trip.status)}</span>
                </div>
              </div>

              {/* Trip Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {trip.title || 'Sans titre'}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="mr-1 text-orange-500" size={16} />
                    <span>{trip.startLocation || 'N/A'} → {trip.endLocation || 'N/A'}</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-3 space-y-2">
                  {/* Truck & Trailer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Truck className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Camion</span>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {trip.truck?.matricule || 'N/A'}
                    </span>
                  </div>

                  {trip.trailer && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <span className="mr-2 text-orange-500 text-sm">📦</span>
                        <span className="text-sm">Remorque</span>
                      </div>
                      <span className="text-white font-semibold text-sm">
                        {trip.trailer?.matricule || 'N/A'}
                      </span>
                    </div>
                  )}

                  {/* Driver */}
                  {trip.driver && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <User className="mr-2 text-orange-500" size={18} />
                        <span className="text-sm">Chauffeur</span>
                      </div>
                      <span className="text-white font-semibold text-sm">
                        {trip.driver?.fullname || 'N/A'}
                      </span>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Départ</span>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {trip.startDate 
                        ? new Date(trip.startDate).toLocaleDateString('fr-FR')
                        : 'N/A'
                      }
                    </span>
                  </div>

                  {trip.endDate && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="mr-2 text-orange-500" size={18} />
                        <span className="text-sm">Arrivée</span>
                      </div>
                      <span className="text-white font-semibold text-sm">
                        {new Date(trip.endDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}

                  {/* Kilométrage */}
                  {(trip.kilometrageDepart || trip.kilometrageArrivee) && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <Gauge className="mr-2 text-orange-500" size={18} />
                        <span className="text-sm">Kilométrage</span>
                      </div>
                      <span className="text-white font-semibold text-xs">
                        {trip.kilometrageDepart || '?'} → {trip.kilometrageArrivee || '?'} km
                      </span>
                    </div>
                  )}

                  {/* Carburant */}
                  {(trip.carburantDepart || trip.carburantArrivee) && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <Fuel className="mr-2 text-orange-500" size={18} />
                        <span className="text-sm">Carburant</span>
                      </div>
                      <span className="text-white font-semibold text-xs">
                        {trip.carburantDepart || '?'}L → {trip.carburantArrivee || '?'}L
                      </span>
                    </div>
                  )}
{/* télécharger pdf */}
{isDriver && (
  <button
    onClick={() => dispatch(downloadTripPdf(trip._id))}
    disabled={pdfLoading}
    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg disabled:opacity-50"
  >
    <FileText size={16} />
    {pdfLoading ? "Téléchargement..." : "PDF"}
  </button>
)}

                  {/* Remarques */}
                  {trip.remarks && (
                    <div className="mt-2 p-2 bg-gray-700/50 rounded-lg">
                      <p className="text-gray-300 text-xs italic">{trip.remarks}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Selector (pour admin et driver) */}
              {(isAdmin || isDriver) && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <select
                    value={trip.status}
                    onChange={(e) => handleStatusChange(trip._id, e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="à faire">En attente</option>
                    <option value="en cours">En cours</option>
                    <option value="terminé">Terminé</option>
                  </select>
                </div>
              )}

              {/* Actions Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2 justify-end">
                <button 
                  onClick={() => openEditModal(trip)}
                  className="p-2 bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 text-gray-400 hover:text-orange-500 rounded-lg transition-all duration-300 group"
                  title="Modifier"
                >
                  <Edit size={18} className="group-hover:scale-110 transition-transform" />
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => handleDelete(trip._id)}
                    className="p-2 bg-gray-700/50 hover:bg-red-500/20 border border-gray-600 hover:border-red-500 text-gray-400 hover:text-red-500 rounded-lg transition-all duration-300 group"
                    title="Supprimer"
                  >
                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Create/Edit Trip */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? 'Modifier le' : 'Ajouter un'} <span className="text-orange-500">Voyage</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CHAMPS ADMIN */}
                {isAdmin && (
                  <>
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Titre du voyage
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex: Livraison Casablanca - Marrakech"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Truck */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Camion
                      </label>
                      <select
                        name="truck"
                        value={formData.truck}
                        onChange={handleChange}
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

                    {/* Trailer */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Remorque (optionnel)
                      </label>
                      <select
                        name="trailer"
                        value={formData.trailer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="">-- Aucune remorque --</option>
                        {trailers?.map((trailer) => (
                          <option key={trailer._id} value={trailer._id}>
                            {trailer.matricule}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Driver */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Chauffeur
                      </label>
                      <select
                        name="driver"
                        value={formData.driver}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="">-- Sélectionner un chauffeur --</option>
                        {users?.filter(u => u.role === 'driver').map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.fullname}
                          </option>
                        ))}
                      </select>
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
                        <option value="à faire">En attente</option>
                        <option value="en cours">En cours</option>
                        <option value="terminé">Terminé</option>
                      </select>
                    </div>

                    {/* Start Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Lieu de départ
                      </label>
                      <input
                        type="text"
                        name="startLocation"
                        value={formData.startLocation}
                        onChange={handleChange}
                        placeholder="Ex: Casablanca"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* End Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Lieu d'arrivée
                      </label>
                      <input
                        type="text"
                        name="endLocation"
                        value={formData.endLocation}
                        onChange={handleChange}
                        placeholder="Ex: Marrakech"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date de départ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Kilométrage Départ */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kilométrage départ
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

                    {/* Carburant Départ */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Carburant départ (L)
                      </label>
                      <input
                        type="number"
                        name="carburantDepart"
                        value={formData.carburantDepart}
                        onChange={handleChange}
                        placeholder="Ex: 200"
                        min="0"
                        step="0.1"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </>
                )}

                {/* CHAMPS DRIVER (seulement si editing et driver) */}
                {isDriver && isEditing && (
                  <>
                    {/* End Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date d'arrivée
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Kilométrage Arrivée */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kilométrage arrivée
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
                     <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        carburant arrivée
                      </label>
                      <input
                        type="number"
                        name="carburantArrivee"
                        value={formData.carburantArrivee}
                        onChange={handleChange}
                        placeholder="Ex: 20"
                        min="0"
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
                        <option value="à faire">En attente</option>
                        <option value="en cours">En cours</option>
                        <option value="terminé">Terminé</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Remarques - disponible pour ADMIN et DRIVER */}
                {(isAdmin || (isDriver && isEditing)) && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Remarques (optionnel)
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder="Ajouter des remarques..."
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                )}
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
                  <span>{isEditing ? 'Mettre à jour' : 'Créer le Voyage'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trips;