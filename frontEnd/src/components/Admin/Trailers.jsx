import React, { useState, useEffect } from 'react';
import { Container, Gauge, CheckCircle, Navigation, Wrench, Plus, Edit, Trash2, X, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtrailers, createtrailer, deletetrailer, updatetrailer } from '../../features/trailerSlice';

function Trailers() {
  const dispatch = useDispatch();
  const { trailers, loading, error } = useSelector((state) => state.trailer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    matricule: '',
    type: '',
    capacity: 0,
    status: 'disponible'
  });

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchtrailers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      matricule: '',
      type: '',
      capacity: 0,
      status: 'disponible'
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (trailer) => {
    setIsEditing(true);
    setEditingId(trailer._id);
    setFormData({
      matricule: trailer.matricule,
      type: trailer.type,
      capacity: trailer.capacity,
      status: trailer.status
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    if (isEditing) {
      const resultAction = await dispatch(
        updatetrailer({ id: editingId, trailerData: formData })
      );

      if (updatetrailer.fulfilled.match(resultAction)) {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingId(null);
        setFormData({
          matricule: '',
          type: '',
          capacity: 0,
          status: 'disponible'
        });
        dispatch(fetchtrailers());
      } else {
        setFormError(resultAction.payload || "Erreur lors de la mise à jour");
      }
    } else {
      const resultAction = await dispatch(createtrailer(formData));
      
      if (createtrailer.fulfilled.match(resultAction)) {
        setFormData({
          matricule: '',
          type: '',
          capacity: 0,
          status: 'disponible'
        });
        setIsModalOpen(false);
        dispatch(fetchtrailers());
      } else {
        setFormError(resultAction.payload || 'Erreur lors de la création');
      }
    }

    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette remorque ?')) {
      await dispatch(deletetrailer(id));
      dispatch(fetchtrailers());
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
    setFormData({
      matricule: '',
      type: '',
      capacity: 0,
      status: 'disponible'
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des remorques...</p>
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
      default: return <Container size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Créer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Nos <span className="text-orange-500">Remorques</span>
            </h1>
            <p className="text-gray-400">Gestion et suivi de toutes nos remorques</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter une Remorque
          </button>
        </div>

        {/* Trailers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trailers.map((trailer) => (
            <div
              key={trailer._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Trailer Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <Container className="text-orange-500" size={32} />
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(trailer.status)}`}>
                  {getStatusIcon(trailer.status)}
                  <span className="text-sm font-medium">{trailer.status}</span>
                </div>
              </div>

              {/* Trailer Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{trailer.matricule}</h3>
                  <p className="text-gray-400">{trailer.type || 'Type non spécifié'}</p>
                </div>

                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Gauge className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Capacité</span>
                    </div>
                    <span className="text-white font-semibold">
                      {trailer.capacity?.toLocaleString() || 0} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2 justify-end">
                <button 
                  onClick={() => openEditModal(trailer)}
                  className="p-2 bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 text-gray-400 hover:text-orange-500 rounded-lg transition-all duration-300 group"
                  title="Modifier"
                >
                  <Edit size={18} className="group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => handleDelete(trailer._id)}
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

      {/* Modal Create/Edit Trailer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? 'Modifier la' : 'Ajouter une'} <span className="text-orange-500">Remorque</span>
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
                    placeholder="Ex: RMQ-5678"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Ex: Frigorifique, Bâchée, Porte-conteneur"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Capacité */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Capacité (kg)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Ex: 25000"
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
                  <span>{isEditing ? 'Mettre à jour' : 'Créer la Remorque'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trailers;