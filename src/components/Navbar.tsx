import { motion } from 'framer-motion';
import { Activity, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MySwal from '../config/MySwal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`;

  const linkClasses = 'font-medium hover:text-blue-600 transition-colors duration-300';
  const activeLinkClasses = 'text-blue-600 font-semibold';

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
      }
    });
  };

  return (
    <nav className={navbarClasses}>
      <motion.div
        className="container mx-auto px-4 flex justify-between items-center"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <Link to="/" className="flex items-center space-x-2">
          <Activity size={28} className="text-blue-600" />
          <span className="text-xl font-bold text-gray-800">MedChain</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${linkClasses} ${location.pathname === '/' ? activeLinkClasses : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`${linkClasses} ${location.pathname === '/about' ? activeLinkClasses : ''}`}>
            About
          </Link>
          <Link to="/contact" className={`${linkClasses} ${location.pathname === '/contact' ? activeLinkClasses : ''}`}>
            Contact
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className={`${linkClasses} ${location.pathname === '/dashboard' ? activeLinkClasses : ''}`}>
                  Dashboard
                </Link>
                <button className="btn-outline py-1.5 px-5" onClick={handleLogout}>
                  {user.username}
                </button>
              </>
            ) : (
              <>
              <Link to="/apply" className={`${linkClasses} ${location.pathname === '/apply' ? activeLinkClasses : ''}`}>
                Apply
              </Link>
                <Link to="/login" className="btn-outline py-1.5 px-5">
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-1.5 px-5">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 pt-20 px-6`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <button className="absolute top-4 right-4 text-gray-700 focus:outline-none" onClick={toggleMenu}>
          <X size={24} />
        </button>
        <div className="flex flex-col space-y-6">
          <Link to="/" className={`${linkClasses} ${location.pathname === '/' ? activeLinkClasses : ''}`} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" className={`${linkClasses} ${location.pathname === '/about' ? activeLinkClasses : ''}`} onClick={closeMenu}>
            About
          </Link>
          <Link to="/contact" className={`${linkClasses} ${location.pathname === '/contact' ? activeLinkClasses : ''}`} onClick={closeMenu}>
            Contact
          </Link>
          <Link to="/appointment" className={`${linkClasses} ${location.pathname === '/appointment' ? activeLinkClasses : ''}`} onClick={closeMenu}>
            Appointment
          </Link>
          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <>
                <Link to="/profile" className="block w-full btn-outline text-center mb-4" onClick={closeMenu}>
                  {user.name}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="block w-full btn-outline text-center mb-4" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="block w-full btn-primary text-center" onClick={closeMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;