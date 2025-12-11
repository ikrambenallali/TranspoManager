import React, { useState, useEffect } from 'react';
import { CircleDot, Calendar, MapPin, Plus, Edit, Trash2, X, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTires, createTire, deleteTire, updateTire } from '../../features/tireSlice';
import { fetchTrucks } from '../../features/truckSlice';
import { fetchtrailers } from '../../features/trailerSlice';

function Tires() {
  const dispatch = useDispatch();
  const { tires, loading, error } = useSelector((state) => state.tire);
  const { trucks } = useSelector((state) => state.truck);
  const { trailers } = useSelector((state) => state.trailer);
//   console.log('Tires from Redux:', tires);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    truck: '',
    trailer: '',
    position: '',
    etat: 'bon',
    dateInstallation: ''
  });

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);



  useEffect(() => {
    dispatch(fetchTires());
    dispatch(fetchTrucks());
    dispatch(fetchtrailers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      truck: '',
      trailer: '',
      position: '',
      etat: 'bon',
      dateInstallation: ''
    });
    setFormError('');
    setIsModalOpen(true);
   
  };

  const openEditModal = (tire) => {
    setIsEditing(true);
    setEditingId(tire._id);
    setFormData({
      truck: tire.truck?._id || '',
      trailer: tire.trailer?._id || '',
      position: tire.position,
      etat: tire.etat,
      dateInstallation: tire.dateInstallation?.split('T')[0] || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setFormError('');
  setFormLoading(true);

  // 🚨 Correction obligatoire : convertir "" → null
  const cleanData = {
    ...formData,
    truck: formData.truck === "" ? null : formData.truck,
    trailer: formData.trailer === "" ? null : formData.trailer,
  };

  try {
    if (isEditing) {
      await dispatch(updateTire({ id: editingId, tireData: cleanData }));
    } else {
      await dispatch(createTire(cleanData));
    }
  } catch (error) {
    console.error(error);
  }

  setFormLoading(false);
  setIsModalOpen(false);
};


  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce pneu ?')) {
      await dispatch(deleteTire(id));
    //   console.log('Suppression du pneu:', id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
    setFormData({
      truck: '',
      trailer: '',
      position: '',
      etat: 'bon',
      dateInstallation: ''
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des pneus...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error}</div>
    </div>
  );

  const getEtatColor = (etat) => {
    switch (etat) {
      case "neuf": return "border-blue-500 text-blue-500";
      case "bon": return "border-green-500 text-green-500";
      case "usé": return "border-yellow-500 text-yellow-500";
      case "à remplacer": return "border-red-500 text-red-500";
      default: return "border-gray-500 text-gray-500";
    }
  };

  const getEtatBgColor = (etat) => {
    switch (etat) {
      case "neuf": return "bg-blue-500/20";
      case "bon": return "bg-green-500/20";
      case "usé": return "bg-yellow-500/20";
      case "à remplacer": return "bg-red-500/20";
      default: return "bg-gray-500/20";
    }
  };

  return (
    <div className="w-[110%] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Créer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Nos <span className="text-orange-500">Pneus</span>
            </h1>
            <p className="text-gray-400">Gestion et suivi de tous nos pneus</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter un Pneu
          </button>
        </div>

        {/* Tires Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(tires) && tires.map((tire) => (
            <div
              key={tire._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Tire Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${getEtatBgColor(tire.etat)} p-3 rounded-lg`}>
                  <CircleDot className="text-orange-500" size={32} />
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getEtatColor(tire.etat)}`}>
                  <span className="text-sm font-medium capitalize">{tire.etat}</span>
                </div>
              </div>

              {/* Tire Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {tire.truck ? tire.truck.matricule : tire.trailer?.matricule || 'Non assigné'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {tire.truck ? '🚛 Camion' : tire.trailer ? '📦 Remorque' : '❓ Sans véhicule'}
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <MapPin className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Position</span>
                    </div>
                    <span className="text-white font-semibold">
                      {tire.position || 'Non définie'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Installation</span>
                    </div>
                    <span className="text-white font-semibold">
                      {tire.dateInstallation 
                        ? new Date(tire.dateInstallation).toLocaleDateString('fr-FR')
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2 justify-end">
                <button 
                  onClick={() => openEditModal(tire)}
                  className="p-2 bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 text-gray-400 hover:text-orange-500 rounded-lg transition-all duration-300 group"
                  title="Modifier"
                >
                  <Edit size={18} className="group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => handleDelete(tire._id)}
                  className="p-2 bg-gray-700/50 hover:bg-red-500/20 border border-gray-600 hover:border-red-500 text-gray-400 hover:text-red-500 rounded-lg transition-all duration-300 group"
                  title="Supprimer"
                >
                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Create/Edit Tire */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? 'Modifier le' : 'Ajouter un'} <span className="text-orange-500">Pneu</span>
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
                    Camion
                  </label>
                 <select
  name="truck"
  value={formData.truck}
  onChange={(e) => {
    setFormData({
      ...formData,
      truck: e.target.value,
      trailer: e.target.value ? "" : formData.trailer, // annule trailer si truck choisi
    });
  }}
  disabled={formData.trailer !== ""}  // désactive truck si trailer choisi
  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
>

                    <option value="">-- Aucun camion --</option>
                    {trucks.map((truck) => (
                      <option key={truck._id} value={truck._id}>
                        {truck.matricule}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remorque */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Remorque
                  </label>
              <select
  name="trailer"
  value={formData.trailer}
  onChange={(e) => {
    setFormData({
      ...formData,
      trailer: e.target.value,
      truck: e.target.value ? "" : formData.truck, // annule truck si trailer choisi
    });
  }}
  disabled={formData.truck !== ""}  // désactive trailer si truck choisi
  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
>

                    <option value="">-- Aucune remorque --</option>
                    {trailers.map((trailer) => (
                      <option key={trailer._id} value={trailer._id}>
                        {trailer.matricule}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Ex: Avant Gauche, Arrière Droit"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* État */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    État
                  </label>
                  <select
                    name="etat"
                    value={formData.etat}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="neuf">Neuf</option>
                    <option value="bon">Bon</option>
                    <option value="usé">Usé</option>
                    <option value="à remplacer">À Remplacer</option>
                  </select>
                </div>

                {/* Date Installation */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date d'Installation
                  </label>
                  <input
                    type="date"
                    name="dateInstallation"
                    value={formData.dateInstallation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                  <span>{isEditing ? 'Mettre à jour' : 'Créer le Pneu'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tires;