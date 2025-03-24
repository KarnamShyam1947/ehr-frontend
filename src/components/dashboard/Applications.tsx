import React, { useEffect, useState } from 'react';
import { Application } from '../../types/Application';
import { acceptApplication, getApplications, rejectApplication } from '../../services/ApplicationService';
import MySwal from '../../config/MySwal';

const Applications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(1); 
    const [filterType, setFilterType] = useState<string>(''); 
    const [filterStatus, setFilterStatus] = useState<string>(''); 
    const itemsPerPage = 5; 

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            
            const response = await getApplications();
            console.log(response);

            setApplications(response);
            setLoading(false);
        };
        fetchApplications();
    }, []);

    const filteredApplications = applications.filter(application => {
        const matchesSearchTerm = application.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType ? application.type === filterType : true;
        const matchesStatus = filterStatus ? application.status === filterStatus : true;
        return matchesSearchTerm && matchesType && matchesStatus;
    });

    // Updated handleReject function
const handleReject = async (id: number) => {
    const response = await rejectApplication(id);
    console.log(response);
    
    if (response && 'statusCode' in response && response.statusCode >= 400) {
        MySwal.fire({
            icon: 'error',
            title: 'Application rejection failed!',
            text: response.error || 'Application rejection failed!',
        });
    } else {
        MySwal.fire({
            icon: 'success',
            title: 'Application rejected successfully!',
            text: response?.message || 'Application rejected successfully',
        });
    }

    setApplications(prevApplications =>
        prevApplications.map(application =>
            application.id === id ? { ...application, status: 'REJECTED' } : application
        )
    );
};

    
    const handleAccept = async (id: number) => {
        const response = await acceptApplication(id);  
        console.log(response);
        if (response && response.statusCode >= 400) {
            MySwal.fire({
                icon: 'error',
                title: 'Application rejected failed!',
                text: response?.error || 'Application accepted failed!',
            });
        } else {
            MySwal.fire({
                icon: 'success',
                title: 'Application accepted successfully!',
                text: response?.message || 'Application accepted successfully',
            }); 
        }
        setApplications(prevApplications =>
            prevApplications.map(application =>
                application.id === id ? { ...application, status: 'ACCEPTED' } : application
            )
        );
    };  

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType, filterStatus, applications]);

    const indexOfLastApplication = currentPage * itemsPerPage;
    const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
    const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Application Management</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="input-field w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="ml-4 input-field"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="DOCTOR">DOCTOR</option>
                            <option value="LAB_TECHNICIAN">LAB TECHNICIAN</option>
                        </select>
                        <select
                            className="ml-4 input-field"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="APPLIED">APPLIED</option>
                            <option value="ACCEPTED">ACCEPTED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </div>
                    {/* <button className="btn-primary">Add New Application</button> */}
                </div>
                <div className="overflow-x-auto">
                    {loading ? ( 
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentApplications.map((application) => (
                                    <tr key={application.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.phoneNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.specialization}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : application.status === 'APPLIED' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                {application.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {application.status === 'APPLIED' && (
                                                <>
                                                    <button className="text-green-600 hover:text-green-900 mr-3" onClick={() => handleAccept(application.id)}>Accept</button>
                                                    <button className="text-red-600 hover:text-red-900" onClick={() => handleReject(application.id)}>Reject</button>
                                                </>
                                            )}
                                            {application.status === 'ACCEPTED' && (
                                                <button className="text-red-600 hover:text-red-900" onClick={() => handleReject(application.id)}>Reject</button>
                                            )}
                                            {application.status === 'REJECTED' && (
                                                <button className="text-green-600 hover:text-green-900 mr-3" onClick={() => handleAccept(application.id)}>Accept</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="px-6 py-4 flex items-center justify-between border-t">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">{indexOfFirstApplication + 1}</span> to <span className="font-medium">{Math.min(indexOfLastApplication, filteredApplications.length)}</span> of{' '}
                        <span className="font-medium">{filteredApplications.length}</span> results
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded text-sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {[...Array(Math.ceil(filteredApplications.length / itemsPerPage)).keys()].map((page) => (
                            <button key={page} className={`px-3 py-1 border rounded text-sm ${currentPage === page + 1 ? 'bg-blue-600 text-white' : ''}`} onClick={() => setCurrentPage(page + 1)}>
                                {page + 1}
                            </button>
                        ))}
                        <button className="px-3 py-1 border rounded text-sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredApplications.length / itemsPerPage)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Applications;