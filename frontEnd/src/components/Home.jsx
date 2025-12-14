import React from 'react';
import { Truck, Package, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';

function Home() {
  return (
    <section
      className="relative  min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/photo1.jpg')" }}
    >
      {/* Overlay sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>

      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6 backdrop-blur-sm">
            <Truck className="text-orange-500" size={20} />
            <span className="text-orange-500 font-semibold text-sm">Transport Professionnel</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Votre Solution de
            <br />
            <span className="text-orange-500">Transport & Logistique</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Gestion complète de votre flotte, suivi en temps réel et optimisation des livraisons pour un service d'excellence
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/login">
            <button className="group px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/50">
              <span>Commencer maintenant</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            </a>
            
            
          </div>

        

          

        </div>
      </div>

      {/* Effet de gradient animé en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}

export default Home;