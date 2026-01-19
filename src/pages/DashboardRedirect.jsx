import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardRedirect = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === "RECRUITER") {
                navigate("/employer/dashboard", { replace: true });
            } else if (user.role === "APPLIER") {
                navigate("/applicant/dashboard", { replace: true });
            } else if (user.role === "ADMIN") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                // Default fallback
                navigate("/", { replace: true });
            }
        }
    }, [user, navigate]);

    return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
};

export default DashboardRedirect;
