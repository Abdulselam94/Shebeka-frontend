import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DarkModeToggle from "../common/DarkModeToggle";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
        >
          Shebeka<span className="text-blue-600 dark:text-blue-400">Jobs</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300 font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/applicant/jobs"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Find Jobs
          </Link>
          <Link
            to="/companies"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Companies
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          {user ? (
            <>
              <Link
                to={user.role === "RECRUITER" ? "/employer/dashboard" : "/applicant/dashboard"}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to={user.role === "RECRUITER" ? "/employer/profile" : "/applicant/profile"}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors duration-200 shadow-sm"
              >
                My Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors duration-200 shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
