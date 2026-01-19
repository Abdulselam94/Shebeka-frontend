import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { employerApi } from "../../api/employers";

const Settings = () => {
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        notifications: {
            emailOnNewApplication: true,
            emailOnStatusChange: false,
            weeklyDigest: true,
        },
        preferences: {
            autoRejectAfterDays: 30,
            requireCoverLetter: false,
        },
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleNotificationChange = (key) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [key]: !settings.notifications[key],
            },
        });
    };

    const handlePreferenceChange = (key, value) => {
        setSettings({
            ...settings,
            preferences: {
                ...settings.preferences,
                [key]: value,
            },
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: "", text: "" });

        try {
            // In production, save to backend
            // await employerApi.updateSettings(settings);

            // Simulate save
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMessage({ type: "success", text: "Settings saved successfully" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to save settings" });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account preferences and notifications</p>
            </div>

            {message.text && (
                <div
                    className={`mb-6 p-4 rounded-lg border ${message.type === "success"
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-red-50 border-red-200 text-red-700"
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Notifications</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">New Application Alerts</p>
                            <p className="text-sm text-gray-600">Get notified when someone applies to your jobs</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.emailOnNewApplication}
                                onChange={() => handleNotificationChange("emailOnNewApplication")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Status Change Notifications</p>
                            <p className="text-sm text-gray-600">Get notified when application status changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.emailOnStatusChange}
                                onChange={() => handleNotificationChange("emailOnStatusChange")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Weekly Digest</p>
                            <p className="text-sm text-gray-600">Receive a weekly summary of your hiring activity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.weeklyDigest}
                                onChange={() => handleNotificationChange("weeklyDigest")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Hiring Preferences */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Hiring Preferences</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Auto-reject applications after (days)
                        </label>
                        <input
                            type="number"
                            value={settings.preferences.autoRejectAfterDays}
                            onChange={(e) => handlePreferenceChange("autoRejectAfterDays", parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            min="0"
                        />
                        <p className="text-sm text-gray-600 mt-1">
                            Set to 0 to disable auto-rejection
                        </p>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.preferences.requireCoverLetter}
                            onChange={(e) => handlePreferenceChange("requireCoverLetter", e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900">
                            Require cover letter for all applications
                        </label>
                    </div>
                </div>
            </div>

            {/* Account */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-gray-900">{user?.email}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700">Account Type</p>
                        <p className="text-gray-900">Recruiter</p>
                    </div>

                    <Link
                        to="/employer/profile"
                        className="inline-block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-600"
                    >
                        Edit Company Profile
                    </Link>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-blue-300"
                >
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </div>
        </div>
    );
};

export default Settings;
