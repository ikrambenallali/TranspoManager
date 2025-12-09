import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice.jsx";

function Auth() {
    const dispatch = useDispatch();

    // Récupérer loading et error depuis Redux
    const { loading, error } = useSelector((state) => state.auth);

    // States locaux pour les inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));  
    };
console.log("Auth state:", useSelector((state) => state.auth));

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    {loading ? "Chargement..." : "Se connecter"}
                </button>
            </form>

            {error && (
                <p className="text-red-500 mt-3">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Auth;
