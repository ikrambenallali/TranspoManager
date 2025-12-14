import { Routes, Route } from "react-router-dom";
import Auth from "../components/Auth.jsx";
import DriverDashboard from "../components/Driver/DriverDashboard.jsx";
import Home from "../components/Home.jsx";
import CreateDriver from "../components/Admin/createDriver.jsx";
import Trucks from "../components/Admin/Trucks.jsx";
import Trailers from "../components/Admin/Trailers.jsx";
import Tires from "../components/Admin/Tires.jsx";
import Notifications from "../components/Notification.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";
import FuelLogs from "../components/Admin/FuelLog.jsx";
import Trips from "../components/Admin/Trips.jsx";
import MaintenanceRules from "../components/Admin/MaintenanceRules.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/DriverDashboard" element={<DriverDashboard />} />
            <Route path="/CreateDriver" element={<CreateDriver />} />
            <Route path="/Trucks" element={<Trucks />} />
            <Route path="/trailers" element={<Trailers />} />
            <Route path="/tires" element={<Tires />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/fuelLogs" element={<FuelLogs />}></Route>
            <Route path="/maintenanceRules" element={<MaintenanceRules   />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
    );
}
export default AppRoutes;