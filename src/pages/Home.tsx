import { motion } from 'framer-motion';
import { ArrowRight, Award, Clock, Database, Shield, Users } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import Layout from '../components/Layout';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Secure Data",
      description: "Blockchain technology ensures your medical data is secure, immutable, and tamper-proof."
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Real-time Updates",
      description: "Get instant updates on appointments, prescriptions, and medical records."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Patient Control",
      description: "Patients have full control over who can access their medical information."
    },
    {
      icon: <Database className="w-12 h-12 text-blue-500" />,
      title: "Decentralized Storage",
      description: "Medical records are stored across a distributed network for enhanced security."
    }
  ];

  const stats = [
    { value: "98%", label: "Data Security" },
    { value: "24/7", label: "System Availability" },
    { value: "10,000+", label: "Patients Served" },
    { value: "500+", label: "Healthcare Providers" }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <HeroCarousel />
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s">Blockchain-Powered Healthcare</h2>
              <p className="section-subtitle wow fadeInUp" data-wow-delay="0.2s">
                Our platform leverages blockchain technology to create a secure, transparent, and efficient
                hospital management system that puts patients first.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card p-6 text-center wow fadeInUp"
                  data-wow-delay={`${0.1 + index * 0.1}s`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center wow fadeInUp"
                  data-wow-delay={`${0.1 + index * 0.1}s`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s">How It Works</h2>
              <p className="section-subtitle wow fadeInUp" data-wow-delay="0.2s">
                Our blockchain-based system simplifies healthcare management while maintaining the highest
                levels of security and transparency.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="card p-8 text-center wow fadeInLeft"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-blue-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure Registration</h3>
                <p className="text-gray-600 mb-4">
                  Create your account with multi-factor authentication to ensure only you can access your information.
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-blue-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Connect with Providers</h3>
                <p className="text-gray-600 mb-4">
                  Link your profile with healthcare providers to enable secure sharing of medical information.
                </p>
              </motion.div>
              <motion.div
                className="card p-8 text-center wow fadeInRight"
                data-wow-delay="0.3s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-blue-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Manage Your Health</h3>
                <p className="text-gray-600 mb-4">
                  Access your records, schedule appointments, and manage prescriptions all in one secure platform.
                </p>
              </motion.div>
            </div>
            <div className="text-center mt-12">
              <Link
                to="/register"
                className="btn-primary inline-flex items-center wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Get Started Today
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s">What Our Users Say</h2>
              <p className="section-subtitle wow fadeInUp" data-wow-delay="0.2s">
                Hear from healthcare providers and patients who have transformed their experience with MedChain.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="card p-8 wow fadeInUp"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Patient</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Having all my medical records in one secure place has been life-changing. I can share specific information with new doctors without worrying about privacy."
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                </div>
              </motion.div>
              <motion.div
                className="card p-8 wow fadeInUp"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                    alt="Dr. Michael Chen"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Dr. Michael Chen</h4>
                    <p className="text-sm text-gray-500">Cardiologist</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "MedChain has streamlined our patient management process. The blockchain verification ensures data integrity, which is crucial for accurate diagnoses."
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                </div>
              </motion.div>
              <motion.div
                className="card p-8 wow fadeInUp"
                data-wow-delay="0.3s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                    alt="Emily Rodriguez"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-500">Hospital Administrator</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Implementing MedChain has reduced our administrative overhead by 40%. The automated verification processes have virtually eliminated billing errors."
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                  <Award size={20} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 wow fadeInUp"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                Ready to Transform Healthcare Management?
              </motion.h2>
              <motion.p
                className="text-xl mb-8 text-blue-100 wow fadeInUp"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                Join thousands of healthcare providers and patients who are already benefiting from our secure blockchain platform.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 wow fadeInUp"
                data-wow-delay="0.3s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Link to="/register" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Create an Account
                </Link>
                <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Partners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2 wow fadeInUp" data-wow-delay="0.1s">Trusted by Leading Healthcare Institutions</h2>
              <p className="text-gray-600 wow fadeInUp" data-wow-delay="0.2s">Our platform is used by top hospitals and healthcare providers worldwide</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  className="flex justify-center wow fadeInUp"
                  data-wow-delay={`${0.1 + item * 0.05}s`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <div className="h-12 bg-gray-200 rounded-md w-full max-w-[120px] flex items-center justify-center">
                    <span className="text-gray-500 font-semibold">Partner {item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;