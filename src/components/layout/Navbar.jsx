import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 tracking-tight"
        >
          Shebeka<span className="text-blue-600">Jobs</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Find Jobs
          </Link>
          <Link
            to="/companies"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Companies
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors duration-200 shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
