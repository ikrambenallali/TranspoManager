import React from 'react';
import { 
  ShieldAlert,
  Lock,
  ArrowLeft,
  Home,
  AlertTriangle,
  Ban
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Page403() {
    const navigate = useNavigate();

  const handleGoBack = () => {
    // Logique pour retourner à la page précédente
    window.history.back();
  };

  const handleGoHome = () => {
    // Logique pour retourner à l'accueil
    navigate("/");
  };

  return (
    <div className="flex h-250 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          
          {/* Icon Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-orange-600 p-8 rounded-full">
                <ShieldAlert size={80} className="text-white" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-6">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
              403
            </h1>
            <div className="flex items-center justify-center gap-2 text-red-400">
              <Lock size={20} />
              <h2 className="text-2xl font-bold">
                Accès Interdit
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="text-orange-500 mt-1 flex-shrink-0" size={24} />
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2">
                  Vous n'avez pas l'autorisation d'accéder à cette page
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Cette ressource est protégée et nécessite des droits d'accès spécifiques. 
                  Si vous pensez qu'il s'agit d'une erreur, veuillez contacter votre administrateur système.
                </p>
              </div>
            </div>

            {/* Possible Reasons */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-3 font-semibold">Raisons possibles :</p>
              <ul className="text-left text-sm text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Ban size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Vous ne disposez pas des permissions nécessaires pour cette ressource</span>
                </li>
                <li className="flex items-start gap-2">
                  <Ban size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Votre compte n'a pas le rôle requis (administrateur, gestionnaire, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Ban size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span>L'accès à cette section est restreint à certains utilisateurs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 border border-gray-600 hover:border-gray-500"
            >
              <ArrowLeft size={20} />
              Retour en arrière
            </button>
            <button
              onClick={handleGoHome}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-orange-500/30"
            >
              <Home size={20} />
              Retour à l'accueil
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-500">
            Code d'erreur: <span className="text-red-400 font-mono">HTTP 403 Forbidden</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page403;