import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout.jsx";

import Auth from "../components/Auth.jsx";
import Home from "../components/Home.jsx";
import Page403 from "../pages/Paga403.jsx";

// Admin
import Admin from "../pages/Admin.jsx";
import CreateDriver from "../components/Admin/createDriver.jsx";
import Trucks from "../components/Admin/Trucks.jsx";
import Trailers from "../components/Admin/Trailers.jsx";
import Tires from "../components/Admin/Tires.jsx";
import Trips from "../components/Admin/Trips.jsx";
import MaintenanceRules from "../components/Admin/MaintenanceRules.jsx";
import MaintenanceRecords from "../components/Admin/MaintenanceRecords.jsx";
import Drivers from "../components/Admin/drivers.jsx";
import Rapport from "../components/Admin/Rapport.jsx";

// Driver
import Driver from "../pages/Driver.jsx";
import DriverDashboard from "../components/Driver/DriverDashboard.jsx";
import FuelLogs from "../components/Admin/FuelLog.jsx";

function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/page403" element={<Page403 />} />

     {/* ADMIN */}
<Route element={<ProtectedRoute rolesAllowed={["admin"]} />}>
  <Route path="/admin" element={<Layout role="admin" />}>
    <Route index element={<Admin />} />
    <Route path="createDriver" element={<CreateDriver />} />
    <Route path="trucks" element={<Trucks />} />
    <Route path="trailers" element={<Trailers />} />
    <Route path="tires" element={<Tires />} />
    <Route path="trips" element={<Trips />} />
    <Route path="maintenanceRules" element={<MaintenanceRules />} />
    <Route path="maintenanceRecords" element={<MaintenanceRecords />} />
    <Route path="users" element={<Drivers />} />
    <Route path="rapport" element={<Rapport />} />
  </Route>
</Route>

{/* DRIVER */}
<Route element={<ProtectedRoute rolesAllowed={["driver"]} />}>
  <Route path="/driver" element={<Layout role="driver" />}>
    <Route index element={<Driver />} />
    <Route path="dashboard" element={<DriverDashboard />} />
    <Route path="fuelLogs" element={<FuelLogs />} />
    <Route path="trips" element={<Trips />} />
  </Route>
</Route>


    </Routes>
  );
}

export default AppRoutes;
