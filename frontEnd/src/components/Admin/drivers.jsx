import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrivers } from '../../features/userSlice';
import { Link } from 'react-router-dom';

import { User, Mail, Calendar, Shield, Search, AlertCircle, Loader } from 'lucide-react';

function Drivers() {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  // Filtrer uniquement les chauffeurs
  const drivers = users?.filter(user => user.role === 'driver') || [];

  // Filtrer par recherche
  const filteredDrivers = drivers.filter(driver =>
    driver.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Liste des <span className="text-orange-500">Chauffeurs</span>
          </h1>
          <p className="text-gray-400">
            {drivers.length} chauffeur{drivers.length > 1 ? 's' : ''} enregistré{drivers.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-6 flex">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
           <Link to="/admin/createDriver">
  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
    créer un chauffeur
  </button>
</Link>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-orange-500" size={48} />
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start max-w-2xl mx-auto">
            <AlertCircle className="text-red-400 mr-3 flex-shrink-0" size={20} />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* DRIVERS LIST */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver) => (
                <div
                  key={driver._id}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-orange-500/20"
                >
                  {/* AVATAR */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={36} />
                    </div>
                  </div>

                  {/* NAME */}
                  <h3 className="text-xl font-bold text-white text-center mb-4">
                    {driver.fullname}
                  </h3>

                  {/* DETAILS */}
                  <div className="space-y-3">
                    {/* Email */}
                    <div className="flex items-start">
                      <Mail className="text-orange-500 mr-3 flex-shrink-0 mt-1" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Email</p>
                        <p className="text-sm text-gray-200 break-all">{driver.email}</p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-start">
                      <Shield className="text-orange-500 mr-3 flex-shrink-0 mt-1" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Rôle</p>
                        <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full font-semibold">
                          {driver.role}
                        </span>
                      </div>
                    </div>

                    {/* Created At */}
                    <div className="flex items-start">
                      <Calendar className="text-orange-500 mr-3 flex-shrink-0 mt-1" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Date d'inscription</p>
                        <p className="text-sm text-gray-200">{formatDate(driver.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <User className="mx-auto text-gray-600 mb-4" size={64} />
                <p className="text-gray-400 text-lg">
                  {searchTerm ? 'Aucun chauffeur trouvé' : 'Aucun chauffeur enregistré'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Drivers;