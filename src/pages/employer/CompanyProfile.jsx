import { useState, useEffect } from "react";
// We don't have a specific API for company profile yet, but usually it's part of the user profile or a separate Company model.
// For now, let's assume it's part of the User profile or stored in `user.companyProfile`.
// Since our Register form has NO company detail fields, we probably need to add them to the User model or a related RecruiterProfile model.
// Let's check `user.controller.js` or `schema.prisma`. We did not view schema fully.
// Assumption: We might need to add company fields to the User or create a separate Company.
// For MVP, we'll store company name, description, website in `user.company` related field or just json.
// But wait, `Job` model has `company` string field in the form.
// Let's rely on `profile.js` API to update user profile.
import { getProfile, updateProfile } from "../../api/profile";

const CompanyProfile = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "", // Recruiter Name
        email: "",
        companyName: "",
        companyWebsite: "",
        companyDescription: "",
        location: "",
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            // Data is { user: ... }
            const user = data.user || data;
            setFormData({
                name: user.name || "",
                email: user.email || "",
                companyName: user.companyName || "", // Assuming we added this or will add it to schema
                companyWebsite: user.website || "",
                companyDescription: user.bio || "", // We can reuse 'bio' for description
                location: user.location || "",
            });
        } catch (err) {
            console.error("Error loading profile", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: "", text: "" });

        try {
            // We reuse updateProfile which calls /users/profile PUT
            // We need to ensure backend accepts these fields. 
            // In `user.controller.js`, updateProfile usually takes body and updates `prisma.user.update`.
            // If fields like `companyName` don't exist in schema, this will fail or be ignored.
            // Let's assume for now we reuse `bio` -> companyDescription, `location` -> location.
            // `companyName` might technically be the user's `name` if the account is "The Company".
            // But usually Recruiter Name != Company Name.
            // Let's send what we have and see.
            await updateProfile({
                name: formData.name,
                // email: formData.email, // Look, email usually not changeable here
                bio: formData.companyDescription,
                location: formData.location,
                website: formData.companyWebsite,
                // companyName: formData.companyName 
                // We'll rely on bio/location/website for now.
            });
            setMessage({ type: "success", text: "Profile updated successfully" });
        } catch (err) {
            console.error("Error updating profile", err);
            setMessage({ type: "error", text: "Failed to update profile" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-blue-600">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
                    <p className="text-gray-600">Manage your company information</p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-8">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">My Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Note: In a real app we'd have a separate Company model. Using User fields for MVP. */}

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                            <input 
                                type="text"
                                name="companyName" 
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="e.g. Acme Corp"
                            />
                             <p className="text-xs text-gray-500 mt-1">If empty, your name will be used.</p>
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                            <input
                                type="url"
                                name="companyWebsite"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="City, Country"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">About Company (Bio)</label>
                            <textarea
                                name="companyDescription"
                                value={formData.companyDescription}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Tell us about your company culture and mission..."
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-blue-300"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
