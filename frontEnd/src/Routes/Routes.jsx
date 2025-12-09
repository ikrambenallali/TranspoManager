import { Routes, Route } from "react-router-dom";
import Auth from "../components/Auth.jsx";
import DriverDashboard from "../components/Driver/DriverDashboard.jsx";
import Home from "../components/Home.jsx";
import CreateDriver from "../components/Admin/createDriver.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/DriverDashboard" element={<DriverDashboard />} />
            <Route path="/CreateDriver" element={<CreateDriver />} />

        </Routes>
    );
}
export default AppRoutes;