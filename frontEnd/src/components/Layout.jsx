import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidbar";

function Layout({ role = "driver" }) {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar dynamique */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        role={role}
      />

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
