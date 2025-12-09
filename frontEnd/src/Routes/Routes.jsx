import { Routes, Route } from "react-router-dom";
import Auth from "../components/Auth.jsx";
import DriverDashboard from "../components/Driver/DriverDashboard.jsx";
import Home from "../components/Home.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/DriverDashboard" element={<DriverDashboard />} />
        </Routes>
    );
}
export default AppRoutes;