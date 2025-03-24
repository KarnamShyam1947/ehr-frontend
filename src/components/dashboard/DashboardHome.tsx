import {
    Calendar,
    Database,
    FileText,
    Shield,
    User,
    Users
} from 'lucide-react';

const DashboardHome = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
                    <Users className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">1,284</p>
                <p className="text-sm text-green-600 mt-2">+12% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Appointments</h3>
                    <Calendar className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">42</p>
                <p className="text-sm text-green-600 mt-2">Today's scheduled</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Staff Members</h3>
                    <User className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">68</p>
                <p className="text-sm text-gray-600 mt-2">Active personnel</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Blockchain Status</h3>
                    <Shield className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">100%</p>
                <p className="text-sm text-green-600 mt-2">All systems operational</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Patient Admissions</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart would be displayed here</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                            <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">New patient record created</p>
                            <p className="text-xs text-gray-500">10 minutes ago</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                            <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Appointment scheduled</p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-purple-100 rounded-full p-2 mr-3">
                            <Database className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Database backup completed</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-yellow-100 rounded-full p-2 mr-3">
                            <Shield className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Security audit passed</p>
                            <p className="text-xs text-gray-500">Yesterday</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardHome;