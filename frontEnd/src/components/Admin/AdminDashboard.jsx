import React from "react";

function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      
      {/* Contenu principal */}
      <main className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="border-b border-gray-700 px-8 py-6 bg-gray-800">
          <h1 className="text-3xl font-bold">
            Tableau de <span className="text-orange-500">Bord</span>
          </h1>
          <p className="text-gray-400 mt-1">
            Espace administrateur
          </p>
        </header>

        {/* Body */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Bienvenue 
            </h2>
            <p className="text-gray-400">
              Sélectionnez une option depuis le menu pour commencer.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;
