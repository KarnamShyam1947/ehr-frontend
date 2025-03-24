import { motion } from 'framer-motion';
import { Lock, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const NoAccess = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Lock className="h-24 w-24 text-red-500 mx-auto" />
          </motion.div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">No Access</h2>
          <p className="text-gray-600 mb-8">
            You do not have permission to view this page.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="btn-primary inline-flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NoAccess;