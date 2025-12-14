import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Gauge, Plus, Trash2, X, AlertCircle, Wrench, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchMaintenanceRecords, 
  createMaintenanceRecord, 
  deleteMaintenanceRecord,
} from '../../features/maintenanceRecordSlice';
import { fetchMaintenanceRules } from '../../features/maintenanceRuleSlice';
import { fetchTrucks } from '../../features/truckSlice';
import { fetchtrailers } from '../../features/trailerSlice';
import { fetchTires } from '../../features/tireSlice';

function MaintenanceRecords() {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.maintenanceRecord);
  const { rules } = useSelector((state) => state.maintenanceRule);
  const { trucks } = useSelector((state) => state.truck);
  const { trailers } = useSelector((state) => state.trailer);
  const { tires } = useSelector((state) => state.tire);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    targetType: 'truck',
    targetId: '',
    rule: '',
    description: '',
    performedAt: '',
    kmAtMaintenance: ''
  });

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Filter state
//   const [filterType, setFilterType] = useState('all');
//   const [filterTarget, setFilterTarget] = useState('');

  useEffect(() => {
    dispatch(fetchMaintenanceRecords());
    dispatch(fetchMaintenanceRules());
    dispatch(fetchTrucks());
    dispatch(fetchtrailers());
    dispatch(fetchTires());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Reset targetId when targetType changes
    if (name === 'targetType') {
      setFormData(prev => ({ ...prev, targetId: '' }));
    }
  };

  const openCreateModal = () => {
    setFormData({
      targetType: 'truck',
      targetId: '',
      rule: '',
      description: '',
      performedAt: new Date().toISOString().split('T')[0],
      kmAtMaintenance: ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    // Validation
    if (!formData.targetId) {
      setFormError('Veuillez sélectionner un équipement');
      setFormLoading(false);
      return;
    }
    if (!formData.rule) {
      setFormError('Veuillez sélectionner une règle de maintenance');
      setFormLoading(false);
      return;
    }

    const dataToSend = {
      targetType: formData.targetType,
      targetId: formData.targetId,
      rule: formData.rule,
      description: formData.description || undefined,
      performedAt: formData.performedAt || undefined,
      kmAtMaintenance: formData.kmAtMaintenance ? Number(formData.kmAtMaintenance) : undefined
    };

    try {
      await dispatch(createMaintenanceRecord(dataToSend)).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setFormError(error || 'Une erreur est survenue');
    }

    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement de maintenance ?')) {
      await dispatch(deleteMaintenanceRecord(id));
    }
  };

//   const handleFilter = () => {
//     if (filterType === 'all') {
//       dispatch(fetchMaintenanceRecords());
//     } else if (filterTarget) {
//       dispatch(fetchRecordsByTarget({ targetType: filterType, targetId: filterTarget }));
//     }
//   };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError('');
    setFormData({
      targetType: 'truck',
      targetId: '',
      rule: '',
      description: '',
      performedAt: '',
      kmAtMaintenance: ''
    });
  };

  const getTargetIcon = (type) => {
    switch (type) {
      case 'truck': return '🚛';
      case 'trailer': return '📦';
      case 'tire': return '⚙️';
      default: return '🔧';
    }
  };

  const getTargetLabel = (type) => {
    switch (type) {
      case 'truck': return 'Camion';
      case 'trailer': return 'Remorque';
      case 'tire': return 'Pneu';
      default: return type;
    }
  };

  const getTargetColor = (type) => {
    switch (type) {
      case 'truck': return 'border-blue-500 text-blue-500';
      case 'trailer': return 'border-green-500 text-green-500';
      case 'tire': return 'border-purple-500 text-purple-500';
      default: return 'border-gray-500 text-gray-500';
    }
  };

  const getTargetBgColor = (type) => {
    switch (type) {
      case 'truck': return 'bg-blue-500/20';
      case 'trailer': return 'bg-green-500/20';
      case 'tire': return 'bg-purple-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getTargetOptions = () => {
    switch (formData.targetType) {
      case 'truck':
        return trucks || [];
      case 'trailer':
        return trailers || [];
      case 'tire':
        return tires || [];
      default:
        return [];
    }
  };

 const getTargetName = (record) => {
  return record.targetMatricule || 'N/A';
};


//   const getFilterOptions = () => {
//     switch (filterType) {
//       case 'truck':
//         return trucks || [];
//       case 'trailer':
//         return trailers || [];
//       case 'tire':
//         return tires || [];
//       default:
//         return [];
//     }
//   };

  if (loading && records.length === 0) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des enregistrements...</p>
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
              Historique de <span className="text-orange-500">Maintenance</span>
            </h1>
            <p className="text-gray-400">Suivi de toutes les maintenances effectuées</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Enregistrer une Maintenance
          </button>
        </div>

        {/* Filters */}
        {/* <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Filter className="inline mr-2" size={16} />
                Type d'équipement
              </label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setFilterTarget('');
                }}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Tous les équipements</option>
                <option value="truck">🚛 Camions</option>
                <option value="trailer">📦 Remorques</option>
                <option value="tire">⚙️ Pneus</option>
              </select>
            </div>

            {filterType !== 'all' && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Équipement spécifique
                </label>
                <select
                  value={filterTarget}
                  onChange={(e) => setFilterTarget(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">-- Tous --</option>
                  {getFilterOptions().map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.matricule || item.position || item._id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleFilter}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-300"
            >
              Filtrer
            </button>
          </div>
        </div> */}

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(records) && records.map((record) => (
            <div
              key={record._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
                
              {/* Record Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${getTargetBgColor(record.targetType)} p-3 rounded-lg`}>
                  <Wrench className="text-orange-500" size={32} />
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getTargetColor(record.targetType)}`}>
                  <span className="text-sm font-medium">
                    {getTargetIcon(record.targetType)} {getTargetLabel(record.targetType)}
                  </span>
                </div>
              </div>

              {/* Record Info */}
              <div className="space-y-3">
                <div>
                 <h3 className="text-xl font-bold text-white mb-1">
  {getTargetName(record)}
</h3>

                  <p className="text-gray-400 text-sm">
                    {record.rule?.description || 'Maintenance'}
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-3 space-y-2">
                  {/* Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="mr-2 text-orange-500" size={18} />
                      <span className="text-sm">Effectuée le</span>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {record.performedAt 
                        ? new Date(record.performedAt).toLocaleDateString('fr-FR')
                        : 'N/A'
                      }
                    </span>
                  </div>

                  {/* Kilométrage */}
                  {record.kmAtMaintenance && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <Gauge className="mr-2 text-orange-500" size={18} />
                        <span className="text-sm">Kilométrage</span>
                      </div>
                      <span className="text-white font-semibold text-sm">
                        {record.kmAtMaintenance.toLocaleString()} km
                      </span>
                    </div>
                  )}

                  {/* Rule Info */}
                  {record.rule && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <FileText className="mr-2 text-orange-500" size={18} />
                        <span className="text-sm">Règle</span>
                      </div>
                      <span className="text-white font-semibold text-xs">
                        {record.rule.intervalValue} {record.rule.intervalType === 'km' ? 'km' : 'j'}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {record.description && (
                    <div className="mt-2 p-2 bg-gray-700/50 rounded-lg">
                      <p className="text-gray-300 text-xs italic">{record.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2 justify-end">
                <button 
                  onClick={() => handleDelete(record._id)}
                  className="p-2 bg-gray-700/50 hover:bg-red-500/20 border border-gray-600 hover:border-red-500 text-gray-400 hover:text-red-500 rounded-lg transition-all duration-300 group"
                  title="Supprimer"
                >
                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {records.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="mx-auto text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 text-lg">Aucun enregistrement de maintenance trouvé</p>
            <p className="text-gray-500 text-sm mt-2">Commencez par enregistrer votre première maintenance</p>
          </div>
        )}
      </div>

      {/* Modal Create Record */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                Enregistrer une <span className="text-orange-500">Maintenance</span>
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
                {/* Target Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type d'équipement <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="targetType"
                    value={formData.targetType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="truck">🚛 Camion</option>
                    <option value="trailer">📦 Remorque</option>
                    <option value="tire">⚙️ Pneu</option>
                  </select>
                </div>

                {/* Target ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Équipement <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="targetId"
                    value={formData.targetId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">-- Sélectionner un équipement --</option>
                    {getTargetOptions().map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.matricule || item.position || item._id}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rule */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Règle de maintenance <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="rule"
                    value={formData.rule}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">-- Sélectionner une règle --</option>
                    {rules?.filter(r => r.target === formData.targetType).map((rule) => (
                      <option key={rule._id} value={rule._id}>
                        {getTargetIcon(rule.target)} {getTargetLabel(rule.target)} - Tous les {rule.intervalValue} {rule.intervalType === 'km' ? 'km' : 'jours'}
                        {rule.description && ` (${rule.description})`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Performed At */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date de la maintenance
                  </label>
                  <input
                    type="date"
                    name="performedAt"
                    value={formData.performedAt}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Km At Maintenance */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kilométrage (optionnel)
                  </label>
                  <input
                    type="number"
                    name="kmAtMaintenance"
                    value={formData.kmAtMaintenance}
                    onChange={handleChange}
                    placeholder="Ex: 50000"
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description / Notes (optionnel)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ex: Vidange effectuée, filtres remplacés..."
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
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <span>Enregistrer</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintenanceRecords;