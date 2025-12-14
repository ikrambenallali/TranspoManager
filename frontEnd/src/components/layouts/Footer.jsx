import react from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
function Footer() {
  return (
    <footer className="relative w-[100%] bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              TRANS<span className="text-orange-500">PORT</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Votre partenaire de confiance pour tous vos besoins de transport routier à travers l'Europe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#accueil" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Nos Services</a></li>
              <li><a href="#flotte" className="text-gray-400 hover:text-white transition-colors">Notre Flotte</a></li>
              <li><a href="#apropos" className="text-gray-400 hover:text-white transition-colors">À Propos</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Nos Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Transport National</li>
              <li className="text-gray-400">Transport International</li>
              <li className="text-gray-400">Logistique</li>
              <li className="text-gray-400">Entreposage</li>
              <li className="text-gray-400">Express</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Route du Transport, Casablanca, Maroc</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-orange-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-orange-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contact@transport.ma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} TransPort. Tous droits réservés. | 
            <a href="#" className="text-orange-500 hover:text-orange-400 ml-2">Politique de confidentialité</a> | 
            <a href="#" className="text-orange-500 hover:text-orange-400 ml-2">Conditions d'utilisation</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;