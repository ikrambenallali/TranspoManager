import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice.jsx";
import { useNavigate } from "react-router-dom";

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
        <div className="p-6 max-w-md mx-auto h-100 mt-32">
            <h1 className="text-2xl text-orange-500 font-bold mb-4">Login</h1>

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
                    className="bg-orange-500 text-white p-2 rounded"
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
