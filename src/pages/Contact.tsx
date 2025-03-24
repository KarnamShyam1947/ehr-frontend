import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { contactSchema, initialValues } from '../schema/ContactSchema';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };



  const handleSubmit = (values:any, actions:any) => {
    // In a real application, you would send the form data to your backend
    console.log(values);
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      actions.setSubmitting(false);
      actions.resetForm();
    }, 1000);
  };

  return (
    <Layout>
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 wow fadeInDown"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                Contact Us
              </motion.h1>
              <motion.p
                className="text-xl mb-8 text-blue-100 wow fadeInUp"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                Have questions about MedChain? Our team is here to help you.
                Get in touch with us today.
              </motion.p>
            </div>
          </div>
        </section>
        {/* Contact Information */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <motion.div
                className="card p-8 text-center wow fadeInUp"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                <p className="text-gray-600">
                  123 Healthcare Blvd<br />
                  Medical District<br />
                  CA 90210
                </p>
              </motion.div>
              <motion.div
                className="card p-8 text-center wow fadeInUp"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone Number</h3>
                <p className="text-gray-600">
                  +1 (555) 123-4567<br />
                  +1 (555) 987-6543
                </p>
              </motion.div>
              <motion.div
                className="card p-8 text-center wow fadeInUp"
                data-wow-delay="0.3s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Address</h3>
                <p className="text-gray-600">
                  contact@medchain.com<br />
                  support@medchain.com
                </p>
              </motion.div>
              <motion.div
                className="card p-8 text-center wow fadeInUp"
                data-wow-delay="0.4s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday<br />
                  9:00 AM - 6:00 PM
                </p>
              </motion.div>
            </div>
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <motion.div
                className="lg:w-1/2 wow fadeInLeft"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Have a question or want to learn more about MedChain? Fill out the form below and our team will get back to you as soon as possible.
                </p>
      
                <Formik
                  initialValues={initialValues}
                  validationSchema={contactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          className={`input-field ${errors.name && touched.name ? 'border-red-500' : ''}`}
                          placeholder="John Doe"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className={`input-field ${errors.email && touched.email ? 'border-red-500' : ''}`}
                          placeholder="john@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                        <Field
                          type="text"
                          name="subject"
                          id="subject"
                          className={`input-field ${errors.subject && touched.subject ? 'border-red-500' : ''}`}
                          placeholder="Inquiry about MedChain"
                        />
                        <ErrorMessage name="subject" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                        <Field
                          as="textarea"
                          name="message"
                          id="message"
                          rows="5"
                          className={`input-field ${errors.message && touched.message ? 'border-red-500' : ''}`}
                          placeholder="Your message here..."
                        />
                        <ErrorMessage name="message" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary inline-flex items-center"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="ml-2" size={20} />
                      </button>
                    </Form>
                  )}
                </Formik>
              </motion.div>
              {/* Map */}
              <motion.div
                className="lg:w-1/2 wow fadeInRight"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Location</h2>
                <p className="text-gray-600 mb-8">
                  Visit our headquarters in the heart of the Medical District. We're conveniently located near major hospitals and healthcare facilities.
                </p>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
                  <p className="text-gray-500 text-center p-4">
                    [Map would be displayed here in a real application]<br />
                    123 Healthcare Blvd, Medical District, CA 90210
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 wow fadeInUp"
              data-wow-delay="0.1s"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Find answers to common questions about MedChain and our blockchain-based hospital management system.
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="card p-6 mb-4 wow fadeInUp"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-2">How secure is the blockchain technology used by MedChain?</h3>
                <p className="text-gray-600">
                  MedChain uses a private, permissioned blockchain with advanced encryption and access controls.
                  Our system exceeds HIPAA requirements and undergoes regular security audits to ensure the highest
                  level of protection for sensitive medical data.
                </p>
              </motion.div>
              <motion.div
                className="card p-6 mb-4 wow fadeInUp"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-2">Can MedChain integrate with our existing hospital systems?</h3>
                <p className="text-gray-600">
                  Yes, MedChain is designed to integrate seamlessly with most existing hospital management systems,
                  electronic health records (EHR), and other healthcare software. Our team will work with you to
                  ensure a smooth transition and integration process.
                </p>
              </motion.div>
              <motion.div
                className="card p-6 mb-4 wow fadeInUp"
                data-wow-delay="0.3s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-2">How does MedChain handle patient consent and privacy?</h3>
                <p className="text-gray-600">
                  Patient consent is at the core of our system. Patients have granular control over who can access
                  their medical records and for what purpose. All access is recorded on the blockchain, creating
                  an immutable audit trail that ensures transparency and accountability.
                </p>
              </motion.div>
              <motion.div
                className="card p-6 mb-4 wow fadeInUp"
                data-wow-delay="0.4s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-2">What training and support does MedChain provide?</h3>
                <p className="text-gray-600">
                  We offer comprehensive training for all users, from administrators to healthcare providers and
                  patients. Our support team is available 24/7 to assist with any questions or issues. We also
                  provide detailed documentation, video tutorials, and regular webinars.
                </p>
              </motion.div>
              <motion.div
                className="card p-6 wow fadeInUp"
                data-wow-delay="0.5s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-2">How can our hospital become a MedChain partner?</h3>
                <p className="text-gray-600">
                  To become a MedChain partner, please contact our sales team through this form or email us at
                  partnerships@medchain.com. We'll schedule a consultation to discuss your specific needs and
                  provide a customized implementation plan for your facility.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;