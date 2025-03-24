import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, Shield, Users, Zap } from 'lucide-react';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Former Chief of Medicine with 15+ years of experience in healthcare administration and blockchain technology."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Blockchain expert with a background in medical informatics and secure systems architecture."
    },
    {
      name: "Emily Rodriguez",
      role: "COO",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Healthcare operations specialist focused on optimizing hospital workflows and patient experience."
    },
    {
      name: "David Kim",
      role: "Head of Security",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Cybersecurity expert specializing in healthcare data protection and HIPAA compliance."
    }
  ];

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
                About MedChain
              </motion.h1>
              <motion.p
                className="text-xl mb-8 text-blue-100 wow fadeInUp"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                We're revolutionizing healthcare management with blockchain technology,
                creating a more secure, transparent, and efficient system for patients and providers.
              </motion.p>
            </div>
          </div>
        </section>
        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2 wow fadeInLeft"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Our Story"
                  className="rounded-lg shadow-lg w-full"
                />
              </motion.div>
              <motion.div
                className="lg:w-1/2 wow fadeInRight"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="section-title">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  MedChain was founded in 2023 by a team of healthcare professionals and blockchain experts who recognized
                  the need for a more secure and efficient way to manage medical records and hospital operations.
                </p>
                <p className="text-gray-600 mb-6">
                  After witnessing firsthand the challenges of data breaches, inefficient record-keeping, and lack of
                  interoperability between healthcare systems, our founders set out to create a solution that would
                  address these issues while putting patients back in control of their medical data.
                </p>
                <p className="text-gray-600">
                  Today, MedChain is used by hundreds of healthcare providers and thousands of patients worldwide,
                  setting a new standard for secure, transparent, and patient-centered healthcare management.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Our Mission */}
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
              <h2 className="section-title">Our Mission & Values</h2>
              <p className="section-subtitle">
                We're committed to transforming healthcare through technology while maintaining the highest
                standards of security, privacy, and patient care.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                className="card p-8 wow fadeInUp"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-4">
                  <Shield className="w-10 h-10 text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Security First</h3>
                </div>
                <p className="text-gray-600">
                  We prioritize the security and privacy of patient data above all else, using advanced
                  blockchain technology to ensure information remains protected.
                </p>
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
                  <Users className="w-10 h-10 text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Patient Empowerment</h3>
                </div>
                <p className="text-gray-600">
                  We believe patients should have control over their medical data and be active participants
                  in their healthcare journey.
                </p>
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
                  <Award className="w-10 h-10 text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Excellence</h3>
                </div>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from system design to customer support,
                  ensuring the highest quality experience for all users.
                </p>
              </motion.div>
              <motion.div
                className="card p-8 wow fadeInUp"
                data-wow-delay="0.4s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-4">
                  <Clock className="w-10 h-10 text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Efficiency</h3>
                </div>
                <p className="text-gray-600">
                  We're dedicated to streamlining healthcare processes, reducing administrative burden,
                  and allowing providers to focus more on patient care.
                </p>
              </motion.div>
              <motion.div
                className="card p-8 wow fadeInUp"
                data-wow-delay="0.5s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-10 h-10 text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Transparency</h3>
                </div>
                <p className="text-gray-600">
                  We believe in transparent operations and clear communication with all stakeholders,
                  building trust through openness and honesty.
                </p>
              </motion.div>
              <motion.div
                className="card p-8 wow fadeInUp"
                data-wow-delay="0.6s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-4">
                  <Zap className="w-10 h-10 text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Innovation</h3>
                </div>
                <p className="text-gray-600">
                  We continuously innovate and improve our platform, staying at the forefront of healthcare
                  technology to provide cutting-edge solutions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Our Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 wow fadeInUp"
              data-wow-delay="0.1s"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="section-title">Our Leadership Team</h2>
              <p className="section-subtitle">
                Meet the experts behind MedChain who are passionate about transforming healthcare through technology.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="card overflow-hidden wow fadeInUp"
                  data-wow-delay={`${0.1 + index * 0.1}s`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Blockchain Technology */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2 order-2 lg:order-1 wow fadeInLeft"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="section-title">Our Blockchain Technology</h2>
                <p className="text-gray-600 mb-6">
                  MedChain utilizes a private, permissioned blockchain network specifically designed for healthcare applications.
                  This ensures that only authorized parties can access and verify medical records while maintaining the highest
                  levels of security and privacy.
                </p>
                <p className="text-gray-600 mb-6">
                  Our blockchain implementation provides:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Immutable record-keeping that prevents unauthorized alterations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Transparent audit trails for all data access and modifications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Decentralized storage that eliminates single points of failure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Smart contracts that automate and enforce compliance with healthcare regulations</span>
                  </li>
                </ul>
                <p className="text-gray-600">
                  By leveraging blockchain technology, we're creating a more secure, efficient, and patient-centered
                  healthcare ecosystem that benefits all stakeholders.
                </p>
              </motion.div>
              <motion.div
                className="lg:w-1/2 order-1 lg:order-2 wow fadeInRight"
                data-wow-delay="0.1s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <img
                  src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Blockchain Technology"
                  className="rounded-lg shadow-lg w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;