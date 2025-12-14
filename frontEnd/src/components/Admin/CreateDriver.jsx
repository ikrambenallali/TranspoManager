import React, { useState } from 'react';
import { User, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { createDriver } from '../../features/userSlice';
import { useDispatch, useSelector } from "react-redux";

function CreateDriver() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    role: 'driver'
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await dispatch(createDriver(formData)).unwrap();

      console.log("USER CREATED:", user);

      setMessage({
        type: 'success',
        text: 'Chauffeur créé avec succès et email envoyé.'
      });

      setFormData({
        fullname: '',
        email: '',
        role: 'driver'
      });
    } catch (err) {
      console.error("ERROR CREATE USER", err);
      setMessage({
        type: 'error',
        text: err || "Erreur lors de la création du chauffeur"
      });
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Ajouter un <span className="text-orange-500">Chauffeur</span>
          </h1>
          <p className="text-gray-400">Le chauffeur recevra ses identifiants par email</p>
        </div>

        {/* FORM */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="space-y-6">

            {/* Fullname */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="inline mr-2" size={18} />
                Nom Complet
              </label>

              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="Entrez le nom complet du chauffeur"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="inline mr-2" size={18} />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="exemple@email.com"
              />

              <p className="text-xs text-gray-400 mt-2">
                Un mot de passe sera généré automatiquement.
              </p>
            </div>

            {/* Message */}
            {message.text && (
              <div
                className={`p-4 rounded-lg flex items-start ${
                  message.type === 'success'
                    ? 'bg-green-500/20 border border-green-500'
                    : 'bg-red-500/20 border border-red-500'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="text-green-400 mr-3" size={20} />
                ) : (
                  <AlertCircle className="text-red-400 mr-3" size={20} />
                )}
                <p className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                  {message.text}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.fullname || !formData.email}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
              >
                {loading ? "Création..." : "Créer le Chauffeur"}
              </button>

              <button
                onClick={() => {
                  setFormData({ fullname: '', email: '', role: 'driver' });
                  setMessage({ type: '', text: '' });
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Réinitialiser
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CreateDriver;
