import React, { useEffect, useState } from 'react';
import { Appointment } from '../../types/Appointment';
import { useAuth } from '../../contexts/AuthContext';
import { getPatientAppointments, cancelAppointment, getDoctorAppointments, rejectAppointment, acceptAppointment  } from '../../services/AppointmentService';
import MySwal from '../../config/MySwal';
import { useNavigate } from 'react-router-dom';

const Appointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(1); 
    const itemsPerPage = 5; 
    const { user } = useAuth();
    const navigate = useNavigate();
        
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            
            if(user?.role === 'PATIENT'){
                const response = await getPatientAppointments(user.id);
                // Ensure response is an array
                setAppointments(Array.isArray(response) ? response : []);
            }else{
                const response = await getDoctorAppointments(user?.id || 0);
                console.log(response);
                
                setAppointments(Array.isArray(response) ? response : []);
            }
            setLoading(false);
        };
        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter(appointment =>
        appointment.patient.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, appointments]);

    const indexOfLastAppointment = currentPage * itemsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
    const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    
    const handleAccept = async (id: number) => {
        const response = await acceptAppointment(id);
        if(response){
            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment.id === id ? { ...appointment, status: 'ACCEPTED' } : appointment
                )
            );
        }
    };

    const handleCancel = async (id: number) => {
        const response = await cancelAppointment(id);
        if(response){
            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment.id === id ? { ...appointment, status: 'CANCELED' } : appointment
                )
            );
            MySwal.fire('Canceled!', 'The appointment has been canceled.', 'success');
        }
    };

    const handleDoctorCancel = (id: number) => {
        MySwal.fire({
            title: 'Reason for Rejection',
            input: 'textarea',
            inputPlaceholder: 'Enter the reason...',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            preConfirm: (reason) => {
                if (!reason) {
                    MySwal.showValidationMessage('You need to provide a reason!');
                }
                return reason;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const reason = result.value;

                const response = await rejectAppointment(id, reason);
                if(response.statusCode >= 400){
                    MySwal.fire('Error!', response.error, 'error');
                    return;
                }
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                            appointment.id === id ? { ...appointment, status: 'REJECTED', rejectionReason: reason } : appointment
                        )
                    );
                MySwal.fire('Rejected!', 'The appointment has been marked as rejected.', 'success');
            }
        });
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Appointment Schedule</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="input-field w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {
                        user?.role === 'PATIENT' && (
                            <button className="btn-primary" onClick={() => navigate('/appointment')}>Schedule New</button>
                        )
                    }
                </div>
                <div className="overflow-x-auto">
                    {loading ? ( 
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    {
                                        user?.role === 'DOCTOR' && (
                                            <>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                            </>
                                        )
                                    }
                                    {
                                        user?.role === 'PATIENT' && (
                                            <>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                            </>
                                        )
                                    }
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejection Reason</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentAppointments.map((appointment) => (
                                    <tr key={appointment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.slot}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString()}</td>
                                        {
                                            user?.role === 'DOCTOR' && (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.patient.username}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.reason}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.patient.phoneNumber}</td>
                                                </> 
                                            )
                                        }
                                        {
                                            user?.role === 'PATIENT' && (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.doctor.username}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.doctor.specialization}</td>
                                                </>
                                            )
                                        }
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : appointment.status === 'REJECTED' ? 'bg-yellow-100 text-yellow-800' : appointment.status === 'CANCELED' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                        {
                                            appointment.rejectionReason !== null ?
                                            (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.rejectionReason}</td>
                                                </>
                                            ) : (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    -
                                                </td>
                                            )
                                        }
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {
                                                user?.role === 'DOCTOR' && (
                                                    <>
                                                        {appointment.status === 'CREATED' && (
                                                            <>
                                                                <button className="text-green-600 hover:text-green-900 mr-3" onClick={() => handleAccept(appointment.id)}>Accept</button>
                                                                <button className="text-red-600 hover:text-red-900" onClick={() => handleDoctorCancel(appointment.id)}>Reject</button>
                                                            </>
                                                        )}
                                                        {appointment.status === 'REJECTED' && (
                                                            <button className="text-green-600 hover:text-green-900" onClick={() => handleAccept(appointment.id)}>Accept</button>
                                                        )}
                                                    </>
                                                )
                                            }
                                            {
                                                user?.role === 'PATIENT' && (
                                                    <>
                                                        <button className="text-red-600 hover:text-red-900" onClick={() => handleCancel(appointment.id)}>Cancel</button>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="px-6 py-4 flex items-center justify-between border-t">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">{indexOfFirstAppointment + 1}</span> to <span className="font-medium">{Math.min(indexOfLastAppointment, filteredAppointments.length)}</span> of{' '}
                        <span className="font-medium">{filteredAppointments.length}</span> results
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded text-sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {[...Array(Math.ceil(filteredAppointments.length / itemsPerPage)).keys()].map((page) => (
                            <button key={page} className={`px-3 py-1 border rounded text-sm ${currentPage === page + 1 ? 'bg-blue-600 text-white' : ''}`} onClick={() => setCurrentPage(page + 1)}>
                                {page + 1}
                            </button>
                        ))}
                        <button className="px-3 py-1 border rounded text-sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredAppointments.length / itemsPerPage)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;