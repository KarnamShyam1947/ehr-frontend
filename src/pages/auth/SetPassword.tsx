import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { setPasswordSchema } from '../../schema/SetPasswordSchema';
import { setPassword } from '../../services/AuthService';
import MySwal from '../../config/MySwal';
const SetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (values: any, actions: any) => {
    // Handle password setting logic here
    console.log(values);
    const response = await setPassword(values);
    if(response.statusCode >= 400){
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: response.message,
      });
    }else{
      MySwal.fire({
        icon: 'success',
        title: 'Password set successfully',
        text: response.message,
      }).then(() => {
        navigate('/login');
      });
    }
    console.log(response);
    actions.resetForm();
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <Activity size={32} className="text-blue-600" />
                  <span className="text-2xl font-bold text-gray-800">MedChain</span>
                </div>
              </div>
      
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Set Your Password</h2>
      
              <Formik
                initialValues={{ token: token || '', password: '', confirmPassword: '' }}
                validationSchema={setPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={`input-field ${errors.password && touched.password ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 mt-1 text-sm" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={`input-field ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1 text-sm" />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex justify-center items-center"
                    >
                      {isSubmitting ? 'Setting password...' : 'Set Password'}
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default SetPassword;