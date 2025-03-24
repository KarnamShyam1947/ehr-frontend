import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  Menu,
  Settings,
  Users,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import DashboardHome from '../components/dashboard/DashboardHome';
import Patients from '../components/dashboard/Patients';
import Appointments from '../components/dashboard/Appointments';
import Records from '../components/dashboard/Records';
import SettingsPage from '../components/dashboard/Settings';
import Applications from '../components/dashboard/Applications';
import NotFound from '../components/dashboard/NotFound';
import { useAuth } from '../contexts/AuthContext';
import Profile from '../pages/users/Profile';
import ProtectedRoute from '../components/ProcetedRoute';
import LabTestRequests from '../components/dashboard/LabTestRequests';
import AccessList from '../components/dashboard/AccessList';
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { user } = useAuth();

  const sidebarItems = [
    { path: '/dashboard', icon: <Home size={20} />, label: 'Dashboard', allowedRoles: ['ADMIN', 'DOCTOR', 'LAD_TECHNICIAN', 'PATIENT'] },
    { path: '/dashboard/patients', icon: <Users size={20} />, label: 'Users', allowedRoles: ['ADMIN', 'DOCTOR', 'LAD_TECHNICIAN', 'PATIENT'] },
    { path: '/dashboard/appointments', icon: <Calendar size={20} />, label: 'Appointments', allowedRoles: ['DOCTOR', 'PATIENT'] },
    { path: '/dashboard/applications', icon: <FileText size={20} />, label: 'Applications', allowedRoles: ['ADMIN'] },
    { path: '/dashboard/records', icon: <FileText size={20} />, label: 'Medical Records', allowedRoles: ['PATIENT'] },
    { path: '/dashboard/access-list', icon: <FileText size={20} />, label: 'Access List', allowedRoles: ['PATIENT'] },  
    { path: '/dashboard/lab-test-requests', icon: <FileText size={20} />, label: 'Lab Test Requests', allowedRoles: ['LAD_TECHNICIAN'] },
    { path: '/dashboard/settings', icon: <Settings size={20} />, label: 'Settings', allowedRoles: ['ADMIN', 'DOCTOR', 'LAD_TECHNICIAN', 'PATIENT'] },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Mobile Sidebar Toggle */}

      
      {/* Sidebar */}
      <motion.div
        initial={{ x: isSidebarOpen ? 0 : -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 h-full w-64 bg-white shadow-md z-20 overflow-y-auto ${isSidebarOpen ? 'w-64' : 'w-16'}`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
              <Link to="/">
                <h2 className="text-lg font-bold text-gray-800">MedChain</h2>
              </Link>
              <p className="text-xs text-gray-500">{user?.role} Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              user?.role && item.allowedRoles.includes(user.role) && (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    {isSidebarOpen && <span>{item.label}</span>}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="ml-auto w-1.5 h-5 bg-blue-600 rounded-full"
                      />
                    )}
                  </Link>
                </li>
              )
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Blockchain Status
            </h3>
            <div className="bg-green-50 p-3 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Network Status</span>
                <span className="text-sm text-green-600 font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Last Block</span>
                <span className="text-sm text-gray-600">#1,284,392</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Sync Status</span>
                <span className="text-sm text-green-600 font-medium">100%</span>
              </div>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}
      >
        {/* Top Bar */}
        <div className="bg-white sticky top-0 z-10 shadow-sm p-4 flex justify-between items-center">
          
          <h1 className="text-xl font-bold text-gray-800">
            {sidebarItems.find((item) => isActive(item.path))?.label || 'Dashboard'}
            <div style={{ left: '200px' }} className="fixed top-4 z-30">
            <button
              onClick={toggleSidebar}
              className="bg-white p-2 rounded-md shadow-md text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          </h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">Admin User</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              {/* Dropdown would go here */}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/appointments" element={ <Appointments />} />
                <Route path="/records" element={<Records />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/access-list" element={<AccessList />} />
                <Route path="/applications" element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <Applications />
                  </ProtectedRoute>
                } />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/lab-test-requests" element={<LabTestRequests />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;