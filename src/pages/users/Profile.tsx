import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails } from '../../smart-contract/PatientService';
import { fetchRecords } from '../../smart-contract/ReportService';
import { User } from '../../types/User';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const convertToDate = (hexTimestamp: any) => {

    if (hexTimestamp !== "0x00") {
      let decimalTimestamp = parseInt(hexTimestamp, 16);
      let date = new Date(decimalTimestamp * 1000);
      let day = String(date.getDate()).padStart(2, '0');
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let year = date.getFullYear();
      let hours = String(date.getHours()).padStart(2, '0');
      let minutes = String(date.getMinutes()).padStart(2, '0');


      let formattedDate = `${day}|${month}|${year} ${hours}:${minutes}`;
      return formattedDate;
    } else {
      return 'Not Assigned';
    }
  }

  async function getUserData() {
    const userData = await getUserDetails(id || '');
    console.log("userData in profile : ", userData);
    setLoading(false);

    if (userData.error) {
      setError(userData.error);
      return;
    } else {
      if (userData.role === 'PATIENT') {
        const records = await fetchRecords(userData.walletAddress || '');
        console.log(records);
        setRecords(records);
      }
      setUser(userData);
    }
    
  }

  useEffect(() => {
    console.log("id in profile : ", id);
    getUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error || 'User not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-red-600 hover:text-red-800 font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header/Banner section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-48 relative">
          <div className="absolute -bottom-16 left-8 flex items-end">
            <img
              src={user.profileUrl || '/default-avatar.png'}
              alt={`${user.name}'s profile`}
              className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover"
            />
            <div className="ml-6 mb-4">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-20 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <InfoField label="Email" value={user.email} />
                <InfoField label="Username" value={user.username} />
                <InfoField label="Phone" value={user.phoneNumber} />
                <InfoField label="Address" value={user.address} />
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Professional Details</h2>
              <div className="space-y-4">
              <InfoField label="Wallet Address" value={user.walletAddress} />
                {(user.role === 'DOCTOR' || user.role === 'LAB_TECHNICIAN')&& (
                  <>
                    <InfoField label="Specialization" value={user.specialization} />
                    <InfoField label="Experience" value={user.experience} />
                  </>
                )}
                {(user.role === 'DOCTOR' || user.role === 'LAB_TECHNICIAN')&& user.resumeUrl && (
                  <div className="mt-8">
                    <a
                      href={user.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Resume
                    </a>
                  </div>
                )}
                
              </div>
            </div>
          </div>


          {
            user.role === 'PATIENT' && records && records.length > 0 && (
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Medical Records</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {records.map((record: any, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                      <div className="space-y-3">
                        <div className="break-all">
                          <span className="text-sm text-gray-500">IPFS Hash</span>
                          <p className="font-medium text-sm">{record[0]}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Record Url</span>
                          <p className="font-medium">
                            <a href={`https://${import.meta.env.VITE_GATEWAY}/ipfs/${record[0]}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Report</a>                            
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Date</span>
                          <p className="font-medium">{convertToDate(record[2])}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Test Name</span>
                          <p className="font-medium">{record[3]}</p>
                        </div>
                        <div className="break-all">
                          <span className="text-sm text-gray-500">Lab Technician</span>
                          <p className="font-medium text-sm">{record[4]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
};

// Update InfoField component
const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default Profile;
