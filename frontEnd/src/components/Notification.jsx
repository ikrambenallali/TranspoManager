import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/notificationSlice.jsx";
import { Bell, Clock, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const Notifications = () => {
  const dispatch = useDispatch();

  const notificationsState = useSelector(state => state.notifications) || {};
  console.log(notificationsState);
  
  const list = notificationsState.list || [];
  const loading = notificationsState.loading || false;

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Chargement des notifications...</p>
      </div>
    </div>
  );

  // Fonction pour déterminer l'icône et la couleur selon le type de notification
  const getNotificationStyle = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('succès') || lowerMsg.includes('terminé') || lowerMsg.includes('livré')) {
      return {
        icon: <CheckCircle size={24} />,
        iconBg: 'bg-green-500/20',
        iconColor: 'text-green-500',
        borderColor: 'border-green-500/30'
      };
    }
    if (lowerMsg.includes('erreur') || lowerMsg.includes('échec') || lowerMsg.includes('problème')) {
      return {
        icon: <AlertCircle size={24} />,
        iconBg: 'bg-red-500/20',
        iconColor: 'text-red-500',
        borderColor: 'border-red-500/30'
      };
    }
    if (lowerMsg.includes('attention') || lowerMsg.includes('urgent') || lowerMsg.includes('important')) {
      return {
        icon: <AlertTriangle size={24} />,
        iconBg: 'bg-yellow-500/20',
        iconColor: 'text-yellow-500',
        borderColor: 'border-yellow-500/30'
      };
    }
    
    return {
      icon: <Info size={24} />,
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-500',
      borderColor: 'border-orange-500/30'
    };
  };

  return (
    <div className="w-[110%] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-500/20 p-4 rounded-full">
              <Bell className="text-orange-500" size={40} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Vos <span className="text-orange-500">Notifications</span>
          </h1>
          <p className="text-gray-400">
            {list.length > 0 
              ? `${list.length} notification${list.length > 1 ? 's' : ''} au total`
              : 'Aucune notification pour le moment'
            }
          </p>
        </div>

        {/* Notifications List */}
        {list.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-12 border border-gray-700 text-center">
            <div className="bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-gray-500" size={40} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucune notification</h3>
            <p className="text-gray-400">Vous êtes à jour ! Aucune notification à afficher.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map(notification => {
              const style = getNotificationStyle(notification.message);
              
              return (
                <div
                  key={notification._id}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border ${style.borderColor} hover:border-orange-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`${style.iconBg} p-3 rounded-lg flex-shrink-0`}>
                      <div className={style.iconColor}>
                        {style.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-lg mb-2 break-words">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock size={14} className="mr-1.5" />
                        <span>
                          {new Date(notification.createdAt).toLocaleString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;