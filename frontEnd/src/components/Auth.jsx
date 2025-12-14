import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, AlertCircle, Truck } from "lucide-react";

function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    const { loading, error, token } = useSelector((state) => state.auth);

    // Local states 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    // 🟢 Redirection sécurisée
    useEffect(() => {
        if (!loading && token) {
            navigate("/DriverDashboard");
        }
    }, [loading, token, navigate]);

    return (
        <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-4">
                        <Truck className="text-orange-500" size={40} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Bienvenue
                    </h1>
                    <p className="text-gray-400">
                        Connectez-vous à votre <span className="text-orange-500 font-semibold">espace</span>
                    </p>
                </div>

                {/* Card de connexion */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <LogIn className="text-orange-500" size={28} />
                        Connexion
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start">
                            <AlertCircle className="text-red-400 mr-3 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Adresse Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-gray-500" size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="votre@email.com"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-gray-500" size={20} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Connexion en cours...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    <span>Se connecter</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer links (optionnel) */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Mot de passe oublié ? {" "}
                            <a href="#" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">
                                Réinitialiser
                            </a>
                        </p>
                    </div>
                </div>

                {/* Bottom text */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    © 2024 Transport Management System
                </p>
            </div>
        </div>
    );
}

export default Auth;