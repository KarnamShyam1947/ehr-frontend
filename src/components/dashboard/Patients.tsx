import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/UserService';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';

const Patients: React.FC = () => {
    const [patients, setPatients] = useState<User[]>([]); // State for patient data
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
    const itemsPerPage = 5; // Number of items per page

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            // Simulating an API call with more dummy data
            const response = await fetchAllUsers();
            setPatients(response);
            setLoading(false);
        };
        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(patient =>
        patient.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.walletAddress.includes(searchTerm)
    );

    // Reset current page to 1 if the filtered patients change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, patients]);

    const indexOfLastPatient = currentPage * itemsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Patient Management</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="input-field w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary">Add New Patient</button>
                </div>
                <div className="overflow-x-auto">
                    {loading ? ( // Loading animation
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">walletAddress</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentPatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">P-{patient.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            patient.role === 'PATIENT' ? 'bg-green-100 text-green-800' :
                                            patient.role === 'DOCTOR' ? 'bg-blue-100 text-blue-800' :
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                            {patient.role}
                                        </span>
                                    </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.walletAddress}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/dashboard/profile/${patient.id}`} className="text-blue-600 hover:text-blue-900 mr-3">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="px-6 py-4 flex items-center justify-between border-t">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">{indexOfFirstPatient + 1}</span> to <span className="font-medium">{Math.min(indexOfLastPatient, filteredPatients.length)}</span> of{' '}
                        <span className="font-medium">{filteredPatients.length}</span> results
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded text-sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {[...Array(Math.ceil(filteredPatients.length / itemsPerPage)).keys()].map((page) => (
                            <button key={page} className={`px-3 py-1 border rounded text-sm ${currentPage === page + 1 ? 'bg-blue-600 text-white' : ''}`} onClick={() => setCurrentPage(page + 1)}>
                                {page + 1}
                            </button>
                        ))}
                        <button className="px-3 py-1 border rounded text-sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPatients.length / itemsPerPage)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patients;