import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { Activity, Eye, EyeOff, LogIn } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { intialValues, loginSchema } from '../../schema/LoginSchema';
import { useAuth } from '../../contexts/AuthContext';
import MySwal from '../../config/MySwal';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values:any) => {
    // In a real application, you would send the login credentials to your backend
    console.log(values);
    const resp = await login(values);
    console.log("in login ", resp.status);
    
    if (resp.statusCode >= 400) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: resp.error
      })

      return;
    }

    if(resp.status === true) {
      MySwal.fire({
        icon: "success",
        title: "success",
        text: "User loged in successfully"
      })
      localStorage.setItem("user", JSON.stringify(resp.user));
      setUser(resp.user);

      navigate("/", { replace : true });

      return;
    }
    
    else {
      MySwal.fire({
        icon: "error",
        title: "Error While login",
        text: "Invalid user details provided"
      })
    }

    // Simulate API call
    // setTimeout(() => {
    //   alert('Login successful!');
    //   actions.setSubmitting(false);
    //   // Redirect to dashboard in a real application
    // }, 1000);
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
      
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login to Your Account</h2>
      
              <Formik
                initialValues={intialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={`input-field ${errors.email && touched.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                      <div className="relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          className={`input-field pr-10 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 mt-1 text-sm" />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          id="rememberMe"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="text-blue-600 hover:text-blue-800">
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex justify-center items-center"
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                      <LogIn className="ml-2" size={20} />
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

export default Login;