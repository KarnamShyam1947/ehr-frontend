import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { CheckCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { registerApplication } from '../../services/ApplicationService';
import { applicationSchema, initialValues } from '../../schema/ApplicationSchema';
import MySwal from '../../config/MySwal';
import { uploadToCloud } from '../../services/Web3UploadService';

const Apply = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specializations = [
    "Neurology",
    "Orthopedics",
    "Oncology",
    "Pediatrics",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Pulmonology",
    "Nephrology",
    "Rheumatology"
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const nextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async (values: any, actions: any) => {

    console.log(values);
    const response = await registerApplication(values);
    console.log(response);
    
    if (response.statusCode >= 400) {
      MySwal.fire({
        icon: 'error',
        title: 'Application submitted failed!',
        text: response.error,
      });
    } else {
      MySwal.fire({
        icon: 'success',
        title: 'Application submitted successfully!',
        text: 'Our team will contact you soon.',
      });

      actions.resetForm();
      setCurrentStep(1);
    }
    

  };

  async function handleFileUpload(event: any, setFieldValue: any) {
    const ipfsHash = await uploadToCloud(event.target.files[0]);
    const url = `https://${import.meta.env.VITE_GATEWAY}/ipfs/${ipfsHash}`;
    await setFieldValue("resumeUrl", url);
  }


  return (
    <Layout>
      <div className="pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Apply to Join MedChain Network</h2>
              <p className="text-center text-gray-600 mb-8">
                Complete the application below to join our network of healthcare providers using blockchain technology for secure and efficient hospital management.
              </p>
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${step < currentStep
                          ? 'bg-green-500 text-white'
                          : step === currentStep
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                          }`}
                      >
                        {step < currentStep ? (
                          <CheckCircle size={20} />
                        ) : (
                          <span>{step}</span>
                        )}
                      </div>
                      <span className="text-sm mt-2 text-gray-600">
                        {step === 1 ? 'Previous Hospital Information' : step === 2 ? 'Your Contact Information' : 'Resume Information'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="relative mt-2">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                  <div
                    className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={applicationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, setFieldValue }) => (
                  <Form>
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Previous Hospital Information</h3>

                        <div className="mb-4">
                          <label htmlFor="hospitalName" className="block text-gray-700 font-medium mb-2">Hospital Name</label>
                          <Field
                            type="text"
                            name="hospitalName"
                            id="hospitalName"
                            className={`input-field ${errors.hospitalName && touched.hospitalName ? 'border-red-500' : ''}`}
                            placeholder="General Hospital"
                          />
                          <ErrorMessage name="hospitalName" component="div" className="text-red-500 mt-1 text-sm" />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                          <Field
                            as="textarea"
                            type="text"
                            name="address"
                            id="address"
                            className={`input-field ${errors.address && touched.address ? 'border-red-500' : ''}`}
                            placeholder="123 Healthcare Blvd"
                          />
                          <ErrorMessage name="address" component="div" className="text-red-500 mt-1 text-sm" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="hospitalPhone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                            <Field
                              type="text"
                              name="hospitalPhone"
                              id="hospitalPhone"
                              className={`input-field ${errors.hospitalPhone && touched.hospitalPhone ? 'border-red-500' : ''}`}
                              placeholder="Previous Hostipal PhoneNumber"

                            />
                            <ErrorMessage name="hospitalPhone" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>
                          <div>
                            <label htmlFor="hospitalMail" className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <Field
                              type="email"
                              name="hospitalMail"
                              id="hospitalMail"
                              className={`input-field ${errors.hospitalMail && touched.hospitalMail ? 'border-red-500' : ''}`}
                              placeholder="info@hospital.com"
                            />
                            <ErrorMessage name="hospitalMail" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label htmlFor="website" className="block text-gray-700 font-medium mb-2">Website</label>
                          <Field
                            type="text"
                            name="website"
                            id="website"
                            className={`input-field ${errors.website && touched.website ? 'border-red-500' : ''}`}
                            placeholder="https://www.hospital.com"
                          />
                          <ErrorMessage name="website" component="div" className="text-red-500 mt-1 text-sm" />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary"
                          >
                            Next Step
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Contact Information */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              className={`input-field ${errors.firstName && touched.firstName ? 'border-red-500' : ''
                                }`}
                              placeholder="John"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>

                          <div>
                            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
                            <Field
                              type="text"
                              name="lastName"
                              id="lastName"
                              className={`input-field ${errors.lastName && touched.lastName ? 'border-red-500' : ''
                                }`}
                              placeholder="Doe"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="position" className="block text-gray-700 font-medium mb-2">Previous Position</label>
                            <Field
                              type="text"
                              name="position"
                              id="position"
                              className={`input-field ${errors.position && touched.position ? 'border-red-500' : ''
                                }`}
                              placeholder="Hospital Administrator"
                            />
                            <ErrorMessage name="position" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>

                          <div>
                            <label htmlFor="experince" className="block text-gray-700 font-medium mb-2">Experince</label>
                            <Field
                              type="text"
                              name="experince"
                              id="experince"
                              className={`input-field ${errors.experince && touched.experince ? 'border-red-500' : ''
                                }`}
                              placeholder="Doe"
                            />
                            <ErrorMessage name="experince" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              className={`input-field ${errors.email && touched.email ? 'border-red-500' : ''
                                }`}
                              placeholder="john.doe@hospital.com"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                            <Field
                              type="text"
                              name="phone"
                              id="phone"
                              className={`input-field ${errors.phone && touched.phone ? 'border-red-500' : ''
                                }`}
                              placeholder="(123) 456-7890"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500 mt-1 text-sm" />
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-outline"
                          >
                            Previous Step
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary"
                          >
                            Next Step
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Additional Information */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Resume Information</h3>

                        {/* Resume Upload */}
                        <div className="mb-6">
                          <label htmlFor="resume" className="block text-gray-700 font-medium mb-2">Upload Resume</label>
                          <Field
                            type="file"
                            name="resume"
                            id="resume"
                            className={`input-field  ${errors.resumeUrl && touched.resumeUrl ? 'border-red-500' : ''}`}
                            onChange={(event: any) => handleFileUpload(event, setFieldValue)}
                          />

                          <ErrorMessage name="resumeUrl" component="div" className="text-red-500 mt-1 text-sm" />

                        </div>

                        {/* Type of Application Dropdown */}
                        <div className="mb-4">
                          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type of Application</label>
                          <Field
                            as="select"
                            name="type"
                            id="type"
                            className={`input-field ${errors.type && touched.type ? 'border-red-500' : ''}`}>
                            <option value="">Select...</option>
                            <option value="DOCTOR">DOCTOR</option>
                            <option value="LAB_TECHNICIAN">LAB TECHNICIAN</option>
                          </Field>
                          <ErrorMessage name="type" component="div" className="text-red-500 mt-1 text-sm" />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="specialization" className="block text-gray-700 font-medium mb-2">specialization</label>
                          <Field
                            as="select"
                            name="specialization"
                            id="specialization"
                            className={`input-field ${errors.specialization && touched.specialization ? 'border-red-500' : ''}`}>
                            <option value="">Select...</option>
                            {
                              specializations.map((specialization) => (
                                <option key={specialization} value={specialization}>{specialization}</option>
                              ))
                            }
                          </Field>
                          <ErrorMessage name="specialization" component="div" className="text-red-500 mt-1 text-sm" />
                        </div>

                        {/* Cover Letter Textarea */}
                        <div className="mb-6">
                          <label htmlFor="coverLetter" className="block text-gray-700 font-medium mb-2">Cover Letter</label>
                          <Field
                            as="textarea"
                            name="coverLetter"
                            id="coverLetter"
                            className={`input-field ${errors.coverLetter && touched.coverLetter ? 'border-red-500' : ''}`}
                            placeholder="Write your cover letter here..."
                          />
                          <ErrorMessage name="coverLetter" component="div" className="text-red-500 mt-1" />
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
                          <div className="ml-3 text-sm mb-4">
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

                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-outline"
                          >
                            Previous Step
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary inline-flex items-center"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            <Send className="ml-2" size={20} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
          {/* Benefits Section */}
          <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <motion.h3
                className="text-2xl font-bold text-center text-gray-800 mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                Benefits of Joining the MedChain Network
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="flex items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Enhanced Data Security</h4>
                    <p className="text-gray-600">Protect patient data with blockchain's immutable and encrypted record-keeping.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Streamlined Operations</h4>
                    <p className="text-gray-600">Reduce administrative overhead and improve efficiency with automated processes.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Interoperability</h4>
                    <p className="text-gray-600">Seamlessly share data with other healthcare providers in the network while maintaining security.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Reduced Costs</h4>
                    <p className="text-gray-600">Lower operational costs through improved efficiency and reduced need for intermediaries.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Patient Satisfaction</h4>
                    <p className="text-gray-600">Improve patient experience with faster access to records and more transparent care.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Compliance & Reporting</h4>
                    <p className="text-gray-600">Simplify regulatory compliance with automated audit trails and reporting features.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Apply;