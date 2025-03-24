import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="btn-primary">
            Return to Dashboard
        </Link>
    </div>
);

export default NotFound;