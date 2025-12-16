import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Truck, Menu, X, LogOut } from "lucide-react";
import { MENU_BY_ROLE } from "../constants/sidebarMenu";

function Sidebar({ role = "driver" }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = MENU_BY_ROLE[role] || [];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
      border-r border-gray-700 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Truck className="text-orange-500" />
          {sidebarOpen && (
            <span className="text-lg tracking-wide">
              {role === "admin" ? "Admin Panel" : "Driver Panel"}
            </span>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white transition"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-orange-500/20 text-orange-400 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-orange-500"
                  : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {sidebarOpen && (
              <span className="whitespace-nowrap transition-all duration-300">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
          text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
        >
          <LogOut />
          {sidebarOpen && "Déconnexion"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
