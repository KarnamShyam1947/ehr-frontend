const Settings = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            defaultValue="Admin User"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="input-field"
                            defaultValue="admin@medchain.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            className="input-field"
                            defaultValue="+1 (555) 123-4567"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            defaultValue="Administrator"
                            disabled
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button className="btn-primary">Save Changes</button>
                </div>
            </div>

            <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button className="btn-primary">Update Password</button>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Blockchain Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Blockchain Network
                        </label>
                        <select className="input-field">
                            <option>Private Network</option>
                            <option>Ethereum Mainnet</option>
                            <option>Polygon</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Node Address
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            defaultValue="https://node.medchain.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            API Key
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            defaultValue="••••••••••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Verification Level
                        </label>
                        <select className="input-field">
                            <option>High (All Records)</option>
                            <option>Medium (Critical Records Only)</option>
                            <option>Low (Sample Verification)</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="btn-primary">Save Blockchain Settings</button>
                </div>
            </div>
        </div>
    </div>
);

export default Settings;