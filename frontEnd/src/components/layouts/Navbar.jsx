import react from 'react';
import { useState } from "react";
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="w-[110%] top-0  left-0 right-0 z-50">
      <div className="bg-gradient-to-b from-black/70 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-white tracking-wider">
                TRANSPO<span className="text-orange-500">MANAGER</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#accueil" className="text-white hover:text-orange-400 transition-colors duration-300 font-medium">
                Accueil
              </a>
              <a href="#services" className="text-white hover:text-orange-400 transition-colors duration-300 font-medium">
                Services
              </a>
              <a href="#flotte" className="text-white hover:text-orange-400 transition-colors duration-300 font-medium">
                Notre Flotte
              </a>
              <a href="#apropos" className="text-white hover:text-orange-400 transition-colors duration-300 font-medium">
                À Propos
              </a>
              <a href="#contact" className="text-white hover:text-orange-400 transition-colors duration-300 font-medium">
                Contact
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="/login"className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Login
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-orange-400 transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#accueil" className="block px-3 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all">
                Accueil
              </a>
              <a href="#services" className="block px-3 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all">
                Services
              </a>
              <a href="#flotte" className="block px-3 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all">
                Notre Flotte
              </a>
              <a href="#apropos" className="block px-3 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all">
                À Propos
              </a>
              <a href="#contact" className="block px-3 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all">
                Contact
              </a>
              <button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                Devis Gratuit
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;