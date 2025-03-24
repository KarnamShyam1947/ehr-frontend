import { Activity, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="wow fadeInUp" data-wow-delay="0.1s">
            <div className="flex items-center space-x-2 mb-4">
              <Activity size={28} className="text-blue-400" />
              <span className="text-xl font-bold">MedChain</span>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing healthcare management with secure blockchain technology for transparent, 
              efficient, and patient-centered care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="wow fadeInUp" data-wow-delay="0.2s">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/apply" className="text-gray-400 hover:text-white transition-colors">Apply</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="wow fadeInUp" data-wow-delay="0.3s">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Patient Records</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Appointment Scheduling</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Prescription Management</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Billing & Insurance</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Telemedicine</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Health Analytics</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Healthcare Blvd, Medical District, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">contact@medchain.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MedChain. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;