import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent tracking-wide"
        >
          Shebeka<span className="text-green-400">.</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex space-x-8 text-gray-200 font-medium">
          <Link to="/" className="hover:text-green-400 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-400 transition-colors">
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-green-400 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full text-white font-semibold hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all"
          >
            Register
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
