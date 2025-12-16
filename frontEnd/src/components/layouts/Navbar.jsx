import React, { useState } from "react";
import { Menu, Truck, X, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice"; 
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="w-full top-0 left-0 right-0 z-50">
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                <Truck size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight leading-none">
                  TRANSPO<span className="text-orange-500">MANAGER</span>
                </h1>
                <p className="text-xs text-gray-400 tracking-wide">
                  Gestion de Transport
                </p>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-orange-500  text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <a
                  href="/login"
                  className="bg-orange-500  text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Login
                </a>
              )}
            </div>

            {/* Mobile button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-orange-400"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-2">
              
              {!isAuthenticated ? (
                <a
                  href="/login"
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Login
                </a>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
