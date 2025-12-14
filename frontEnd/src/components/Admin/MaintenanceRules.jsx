import React, { useState, useEffect } from 'react';
import { Settings, Calendar, Gauge, Plus, Edit, Trash2, X, AlertCircle, Wrench } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchMaintenanceRules, 
  createMaintenanceRule, 
  deleteMaintenanceRule, 
  updateMaintenanceRule 
} from '../../features/maintenanceRuleSlice';

function MaintenanceRules() {
  const dispatch = useDispatch();
  const { rules, loading, error } = useSelector((state) => state.maintenanceRule);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    target: 'truck',
    intervalType: 'km',
    intervalValue: '',
    description: ''
  });

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchMaintenanceRules());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      target: 'truck',
      intervalType: 'km',
      intervalValue: '',
      description: ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (rule) => {
    setIsEditing(true);
    setEditingId(rule._id);
    setFormData({
      target: rule.target || 'truck',
      intervalType: rule.intervalType || 'km',
      intervalValue: rule.intervalValue || '',
      description: rule.description || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    // Validation
    if (!formData.intervalValue || formData.intervalValue <= 0) {
      setFormError("La valeur d'intervalle doit être supérieure à 0");
      setFormLoading(false);
      return;
    }

    const dataToSend = {
      target: formData.target,
      intervalType: formData.intervalType,
      intervalValue: Number(formData.intervalValue),
      description: formData.description || undefined
    };

    try {
      if (isEditing) {
        await dispatch(updateMaintenanceRule({ id: editingId, data: dataToSend })).unwrap();
      } else {
        await dispatch(createMaintenanceRule(dataToSend)).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setFormError(error || 'Une erreur est survenue');
    }

    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette règle de maintenance ?')) {
      await dispatch(deleteMaintenanceRule(id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
    setFormData({
      target: 'truck',
      intervalType: 'km',
      intervalValue: '',
      description: ''
    });
  };

  const getTargetIcon = (target) => {
    switch (target) {
      case 'truck': return '🚛';
      case 'trailer': return '📦';
      case 'tire': return '⚙️';
      default: return '🔧';
    }
  };

  const getTargetLabel = (target) => {
    switch (target) {
      case 'truck': return 'Camion';
      case 'trailer': return 'Remorque';
      case 'tire': return 'Pneu';
      default: return target;
    }
  };

  const getTargetColor = (target) => {
    switch (target) {
      case 'truck': return 'border-blue-500 text-blue-500';
      case 'trailer': return 'border-green-500 text-green-500';
      case 'tire': return 'border-purple-500 text-purple-500';
      default: return 'border-gray-500 text-gray-500';
    }
  };

  const getTargetBgColor = (target) => {
    switch (target) {
      case 'truck': return 'bg-blue-500/20';
      case 'trailer': return 'bg-green-500/20';
      case 'tire': return 'bg-purple-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getIntervalTypeLabel = (type) => {
    return type === 'km' ? 'Kilomètres' : 'Jours';
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des règles de maintenance...</p>
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
              Règles de <span className="text-orange-500">Maintenance</span>
            </h1>
            <p className="text-gray-400">Définissez les intervalles de maintenance pour vos équipements</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter une Règle
          </button>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(rules) && rules.map((rule) => (
            <div
              key={rule._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Rule Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${getTargetBgColor(rule.target)} p-3 rounded-lg`}>
                  <Wrench className="text-orange-500" size={32} />
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getTargetColor(rule.target)}`}>
                  <span className="text-sm font-medium">
                    {getTargetIcon(rule.target)} {getTargetLabel(rule.target)}
                  </span>
                </div>
              </div>

              {/* Rule Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Maintenance {getTargetLabel(rule.target)}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Tous les <span className="text-orange-400 font-semibold">{rule.intervalValue}</span> {getIntervalTypeLabel(rule.intervalType)}
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      {rule.intervalType === 'km' ? (
                        <Gauge className="mr-2 text-orange-500" size={18} />
                      ) : (
                        <Calendar className="mr-2 text-orange-500" size={18} />
                      )}
                      <span className="text-sm">Type d'intervalle</span>
                    </div>
                    <span className="text-white font-semibold">
                      {getIntervalTypeLabel(rule.intervalType)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Settings className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Valeur</span>
                    </div>
                    <span className="text-white font-semibold">
                      {rule.intervalValue} {rule.intervalType === 'km' ? 'km' : 'j'}
                    </span>
                  </div>

                  {rule.description && (
                    <div className="mt-2 p-2 bg-gray-700/50 rounded-lg">
                      <p className="text-gray-300 text-xs italic">{rule.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2 justify-end">
                <button 
                  onClick={() => openEditModal(rule)}
                  className="p-2 bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 text-gray-400 hover:text-orange-500 rounded-lg transition-all duration-300 group"
                  title="Modifier"
                >
                  <Edit size={18} className="group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => handleDelete(rule._id)}
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

      {/* Modal Create/Edit Rule */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? 'Modifier la' : 'Ajouter une'} <span className="text-orange-500">Règle</span>
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
                {/* Target */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type d'équipement <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="target"
                    value={formData.target}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="truck">🚛 Camion</option>
                    <option value="trailer">📦 Remorque</option>
                    <option value="tire">⚙️ Pneu</option>
                  </select>
                </div>

                {/* Interval Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type d'intervalle <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="intervalType"
                    value={formData.intervalType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="km">Kilomètres (km)</option>
                    <option value="days">Jours</option>
                  </select>
                </div>

                {/* Interval Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Valeur de l'intervalle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="intervalValue"
                    value={formData.intervalValue}
                    onChange={handleChange}
                    placeholder={formData.intervalType === 'km' ? 'Ex: 10000' : 'Ex: 90'}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    {formData.intervalType === 'km' 
                      ? 'Maintenance à effectuer tous les X kilomètres' 
                      : 'Maintenance à effectuer tous les X jours'}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description (optionnel)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ex: Vidange d'huile moteur et remplacement des filtres"
                    rows="4"
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
                  <span>{isEditing ? 'Mettre à jour' : 'Créer la Règle'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintenanceRules;