import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { Activity, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { intialValues, registerSchema } from '../../schema/RegistrationSchema';
import { useAuth } from '../../contexts/AuthContext';
import MySwal from '../../config/MySwal';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // In a real application, you would handle registration here
    console.log(values);

    const resp = await register(values);
    console.log("in component", resp);
    
    if(resp.statusCode >= 400) {
      MySwal.fire({
        icon:"error",
        "title" : "Error While registering",
        text: resp.error
      });

      return;
    }



    setTimeout(() => {
      setSubmitting(false);
      MySwal.fire({
        icon:"success",
        "title" : "success",
        text: "user register successfully"
      });

      navigate('/login');
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-lg wow fadeInUp">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Activity className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Join MedChain and experience the future of healthcare management
            </p>
          </div>
          <Formik
            initialValues={intialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="input-field mt-1"
                      placeholder="John"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="input-field mt-1"
                      placeholder="Doe"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="input-field mt-1"
                      placeholder="Enter email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="input-field mt-1"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="input-field mt-1"
                      placeholder="••••••••"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="input-field mt-1"
                      placeholder="••••••••"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <Field
                    as="textarea"
                    type="address"
                    name="address"
                    id="address"
                    className="input-field mt-1"
                    placeholder="Enter your address"
                    
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 mt-1 text-sm" />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      name="agreeTerms"
                      id="agreeTerms"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </a>
                    </label>
                    <ErrorMessage name="agreeTerms" component="div" className="text-red-500 mt-1" />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex justify-center items-center"
                >
                  {isSubmitting ? (
                    'Creating account...'
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create Account
                    </>
                  )}
                </motion.button>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                      Sign in
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Register;