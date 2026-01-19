import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { employerApi } from "../../api/employers";
import toast from "react-hot-toast";

const ApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState(null);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [addingNote, setAddingNote] = useState(false);

    useEffect(() => {
        loadApplication();
    }, [id]);

    const loadApplication = async () => {
        try {
            setLoading(true);
            // In production, fetch single application with full details
            // const data = await employerApi.getApplication(id);

            // For now, fetch from applications list
            const allApps = await employerApi.getRecruiterApplications();
            const app = allApps.applications.find((a) => a.id === parseInt(id));

            if (!app) {
                toast.error("Application not found");
                navigate("/employer/applications");
                return;
            }

            setApplication(app);

            // Mock notes (in production, fetch from backend)
            setNotes([
                {
                    id: 1,
                    text: "Strong technical background",
                    createdAt: new Date().toISOString(),
                    author: "You",
                },
            ]);
        } catch (error) {
            console.error("Error loading application:", error);
            toast.error("Failed to load application");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await employerApi.updateApplicationStatus(application.id, newStatus);
            setApplication({ ...application, status: newStatus });
            toast.success(`Application marked as ${newStatus.toLowerCase()}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleAddNote = async () => {
        if (!newNote.trim()) return;

        try {
            setAddingNote(true);
            // In production: await employerApi.addApplicationNote(application.id, newNote);

            const note = {
                id: notes.length + 1,
                text: newNote,
                createdAt: new Date().toISOString(),
                author: "You",
            };

            setNotes([note, ...notes]);
            setNewNote("");
            toast.success("Note added");
        } catch (error) {
            toast.error("Failed to add note");
        } finally {
            setAddingNote(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-blue-600">Loading application...</div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-600">Application not found</p>
            </div>
        );
    }

    const statusColors = {
        PENDING: "bg-blue-100 text-blue-800",
        REVIEWED: "bg-purple-100 text-purple-800",
        ACCEPTED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate("/employer/applications")}
                    className="text-blue-600 hover:text-blue-700 mb-4"
                >
                    ← Back to Applications
                </button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {application.applier?.name || "Applicant"}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Applied for: <Link to={`/employer/jobs/${application.job?.id}`} className="text-blue-600 hover:underline">{application.job?.title}</Link>
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
                        {application.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Candidate Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Candidate Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Email</p>
                                <p className="text-gray-900">{application.applier?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Applied On</p>
                                <p className="text-gray-900">{new Date(application.createdAt).toLocaleDateString()}</p>
                            </div>
                            {application.applier?.skills && (
                                <div className="col-span-2">
                                    <p className="text-sm font-medium text-gray-600 mb-2">Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(Array.isArray(application.applier.skills)
                                            ? application.applier.skills
                                            : JSON.parse(application.applier.skills || "[]")
                                        ).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cover Letter */}
                    {application.coverLetter && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Letter</h2>
                            <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
                        </div>
                    )}

                    {/* Resume */}
                    {application.resume && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume</h2>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <span className="text-3xl mr-3">📄</span>
                                    <div>
                                        <p className="font-medium text-gray-900">Resume.pdf</p>
                                        <p className="text-sm text-gray-600">Click to view or download</p>
                                    </div>
                                </div>
                                <a
                                    href={application.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    View Resume
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Internal Notes</h2>

                        {/* Add Note */}
                        <div className="mb-4">
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Add a note about this candidate..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={3}
                            />
                            <button
                                onClick={handleAddNote}
                                disabled={addingNote || !newNote.trim()}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {addingNote ? "Adding..." : "Add Note"}
                            </button>
                        </div>

                        {/* Notes List */}
                        <div className="space-y-3">
                            {notes.map((note) => (
                                <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-gray-900">{note.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {note.author} • {new Date(note.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => handleStatusChange("REVIEWED")}
                                disabled={application.status === "REVIEWED"}
                                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
                            >
                                Mark as Reviewed
                            </button>
                            <button
                                onClick={() => handleStatusChange("ACCEPTED")}
                                disabled={application.status === "ACCEPTED"}
                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300"
                            >
                                Shortlist Candidate
                            </button>
                            <button
                                onClick={() => handleStatusChange("REJECTED")}
                                disabled={application.status === "REJECTED"}
                                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300"
                            >
                                Reject Application
                            </button>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
                        <div className="space-y-4">
                            <div className="flex">
                                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                                    <p className="text-xs text-gray-500">{new Date(application.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            {application.status !== "PENDING" && (
                                <div className="flex">
                                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-purple-600 rounded-full"></div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Status: {application.status}</p>
                                        <p className="text-xs text-gray-500">{new Date(application.updatedAt || application.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetail;
