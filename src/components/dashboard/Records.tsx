import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { createTestRequest, getPatientReports } from '../../smart-contract/ReportService';

const TestRequestSchema = Yup.object().shape({
    testName: Yup.string()
        .min(3, 'Test name must be at least 3 characters')
        .required('Test name is required'),
});



const Records = () => {
    const [reports, setReports] = useState<any[]>([]);

    const fetchReports = async () => {
        const reports = await getPatientReports();
        setReports(reports);
    };
    useEffect(() => {
        fetchReports();
    }, []);

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

    const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
        try {
            console.log('Submitted values:', values);
            await createTestRequest(values.testName);
            fetchReports();
            
            resetForm();
            setSubmitting(false);
        } catch (error) {
            console.error('Error creating test request:', error);
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Medical Records</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* Test Request Form */}
                <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold mb-4">Request Medical Test</h3>
                    <Formik
                        initialValues={{ testName: '' }}
                        validationSchema={TestRequestSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="flex flex-col md:flex-row gap-4">
                                <div className="flex-grow">
                                    <Field
                                        name="testName"
                                        type="text"
                                        placeholder="Enter test name..."
                                        className={`input-field w-full ${errors.testName && touched.testName ? 'border-red-500' : ''}`}
                                    />
                                    {errors.testName && touched.testName && (
                                        <div className="text-red-500 text-sm mt-1">{errors.testName}</div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-primary whitespace-nowrap"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Requesting...' : 'Request Test'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="input-field w-64 mr-4"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient Address
                                </th> */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Test Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Completed At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lab Technician
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reports.map((report: any, index: number) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {report[0]}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {report[3]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {convertToDate(report[2]['_hex'])}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {convertToDate(report[1]['_hex'])}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report[4] === 0 ? 'bg-yellow-100 text-yellow-800' :
                                                report[4] === 1 ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {report[4] === 0 ? 'STARTED' :
                                                report[4] === 1 ? 'REQUESTED' :
                                                    'COMPLETED'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {report[5] == "0x0000000000000000000000000000000000000000" ? 'Not Assigned' : report[5]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                                        <button className="text-purple-600 hover:text-purple-900">Verify</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 flex items-center justify-between border-t mt-4">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                        <span className="font-medium">42</span> results
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded text-sm">Previous</button>
                        <button className="px-3 py-1 border rounded bg-blue-600 text-white text-sm">1</button>
                        <button className="px-3 py-1 border rounded text-sm">2</button>
                        <button className="px-3 py-1 border rounded text-sm">3</button>
                        <button className="px-3 py-1 border rounded text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Records;