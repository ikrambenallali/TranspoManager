import { Routes, Route } from "react-router-dom";
import Auth from "../components/Auth.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Auth />} />
        </Routes>
    );
}
export default AppRoutes;