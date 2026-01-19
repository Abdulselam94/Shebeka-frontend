import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Settings = () => {
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        notifications: {
            emailOnNewJobs: true,
            emailOnApplicationUpdate: true,
            weeklyJobAlerts: false,
        },
        jobAlerts: {
            enabled: false,
            keywords: "",
            location: "",
            jobType: "all",
        },
        privacy: {
            profileVisible: true,
            showEmail: false,
        },
    });
    const [saving, setSaving] = useState(false);

    const handleNotificationChange = (key) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [key]: !settings.notifications[key],
            },
        });
    };

    const handleJobAlertChange = (key, value) => {
        setSettings({
            ...settings,
            jobAlerts: {
                ...settings.jobAlerts,
                [key]: value,
            },
        });
    };

    const handlePrivacyChange = (key) => {
        setSettings({
            ...settings,
            privacy: {
                ...settings.privacy,
                [key]: !settings.privacy[key],
            },
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // await saveSettings(settings);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Settings saved successfully");
        } catch (error) {
            toast.error("Failed to save settings");
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

            {/* Email Notifications */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Notifications</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">New Job Matches</p>
                            <p className="text-sm text-gray-600">Get notified when new jobs match your criteria</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.emailOnNewJobs}
                                onChange={() => handleNotificationChange("emailOnNewJobs")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Application Updates</p>
                            <p className="text-sm text-gray-600">Get notified when your application status changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.emailOnApplicationUpdate}
                                onChange={() => handleNotificationChange("emailOnApplicationUpdate")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Weekly Job Alerts</p>
                            <p className="text-sm text-gray-600">Receive a weekly summary of recommended jobs</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.weeklyJobAlerts}
                                onChange={() => handleNotificationChange("weeklyJobAlerts")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Job Alerts */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Alert Preferences</h2>

                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.jobAlerts.enabled}
                            onChange={(e) => handleJobAlertChange("enabled", e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900">
                            Enable job alerts
                        </label>
                    </div>

                    {settings.jobAlerts.enabled && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Keywords (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={settings.jobAlerts.keywords}
                                    onChange={(e) => handleJobAlertChange("keywords", e.target.value)}
                                    placeholder="e.g. React, Frontend, JavaScript"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Location
                                </label>
                                <input
                                    type="text"
                                    value={settings.jobAlerts.location}
                                    onChange={(e) => handleJobAlertChange("location", e.target.value)}
                                    placeholder="e.g. Remote, New York, San Francisco"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Type
                                </label>
                                <select
                                    value={settings.jobAlerts.jobType}
                                    onChange={(e) => handleJobAlertChange("jobType", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="all">All Types</option>
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="CONTRACT">Contract</option>
                                    <option value="INTERNSHIP">Internship</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Privacy */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Profile Visibility</p>
                            <p className="text-sm text-gray-600">Allow recruiters to find your profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.privacy.profileVisible}
                                onChange={() => handlePrivacyChange("profileVisible")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Show Email</p>
                            <p className="text-sm text-gray-600">Display email on your public profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.privacy.showEmail}
                                onChange={() => handlePrivacyChange("showEmail")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                        <p className="text-gray-900">Job Seeker</p>
                    </div>

                    <button className="text-sm text-red-600 hover:text-red-700">
                        Delete Account
                    </button>
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
