import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import MySwal from '../../config/MySwal';
import { appointmentSchema, initialValues } from '../../schema/AppointmentSchema';
import { User } from '../../types/User';
import { fetchDoctors } from '../../services/AuthService';
import { applyAppointment } from '../../services/AppointmentService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const ApplyAppointment = () => {
  const [doctorData, setDoctorData] = useState<User[]>([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const [doctorsByDepartment, setDoctorsByDepartment] = useState<User[]>([]);

  const fetchDoctorsAndDepartments = async () => {
    const resp = await fetchDoctors();
    console.log(resp);
    
    return resp;
  };

  useEffect(() => {
    const fetchData = async () => {
      const allDoctors = await fetchDoctorsAndDepartments();
      setDoctorData(allDoctors);
    };
    
    fetchData();
  }, []);
  
  const departments = [...new Set(doctorData.map((doctor) => doctor.specialization))];
  
  const handleSubmit = async (values: any, actions: any) => {
    
    console.log(values);

    let data = {
        ...values,
        doctorId: values.doctor,
        patientId: user?.id
    }
    const resp = await applyAppointment(data);

    if(resp.statusCode >= 400) {
      MySwal.fire({
        text: resp.error,
        title: "Error",
        icon: "error"
      })
    } else {
      MySwal.fire({
        text: "appointment request placed successfully",
        title: "Success",
        icon: "success"
      })
      actions.restForm();
      navigate('/dashboard/appointments'); 
    }
    console.log(resp);
    actions.setSubmitting(false);
    
    // setTimeout(async () => {
    //   actions.setSubmitting(false);
    //   actions.resetForm();
    //   await MySwal.fire({
    //     title: 'Success!',
    //     text: 'This is a SweetAlert2 message in React with TypeScript!',
    //     icon: 'success',
    //     confirmButtonText: 'Cool'
    //   });
    // }, 1000);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>, setFieldValue: any) => {
    const department = e.target.value;
    setFieldValue('doctor', ''); 
    setFieldValue('doctorDepartment', department); 
    const doctorsInDepartment = doctorData.filter((doctor) => doctor.specialization === department);
    setDoctorsByDepartment(doctorsInDepartment);
  };

  
  const slots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    
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
                Raise An Appointment Request
              </motion.h1>
              <motion.p
                className="text-xl mb-8 text-blue-100 wow fadeInUp"
                data-wow-delay="0.2s"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                {/* TODO: Change the info */}
                Have questions about MedChain? Our team is here to help you.
                Get in touch with us today.
              </motion.p>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            
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
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Request</h2>
                <p className="text-gray-600 mb-8">
                  {/* Change Info TODO */}
                  Have a question or want to learn more about MedChain? Fill out the form below and our team will get back to you as soon as possible.
                </p>

                <Formik
                  initialValues={initialValues}
                  validationSchema={appointmentSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched, setFieldValue }) => (
                    <Form>
                      <div className="mb-4">
                        <label htmlFor="doctorDepartment" className="block text-gray-700 font-medium mb-2">
                          Doctor Department
                        </label>
                        <Field
                          as="select"
                          name="doctorDepartment"
                          id="doctorDepartment"
                          className={`input-field ${errors.doctorDepartment && touched.doctorDepartment ? 'border-red-500' : ''}`}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleDepartmentChange(e, setFieldValue)}
                        >
                          <option value="">Select Department</option>
                          {departments.map((department, index) => (
                            <option key={index} value={department}>
                              {department}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="doctorDepartment" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="doctor" className="block text-gray-700 font-medium mb-2">Doctor</label>
                        <Field
                          as="select"
                          name="doctor"
                          id="doctor"
                          className={`input-field ${errors.doctor && touched.doctor ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select Doctor</option>
                          {doctorsByDepartment.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.username}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="doctor" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
                        <Field
                          type="date"
                          name="date"
                          id="date"
                          className={`input-field ${errors.date && touched.date ? 'border-red-500' : ''}`}
                        />
                        <ErrorMessage name="date" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="slot" className="block text-gray-700 font-medium mb-2">Slot</label>
                        <Field
                          as="select"
                          name="slot"
                          id="slot"
                          className={`input-field ${errors.slot && touched.slot ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select Slot</option>
                          {slots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="slot" component="div" className="text-red-500 mt-1 text-sm" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">Reason</label>
                        <Field
                          as="textarea"
                          name="reason"
                          id="reason"
                          rows="5"
                          className={`input-field ${errors.reason && touched.reason ? 'border-red-500' : ''}`}
                          placeholder="Your reason here..."
                        />
                        <ErrorMessage name="reason" component="div" className="text-red-500 mt-1 text-sm" />
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
      </div>
    </Layout>
  );
};

export default ApplyAppointment;
