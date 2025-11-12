import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-green-950 to-gray-900 text-white relative overflow-hidden">
      {/* Animated floating lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-green-500/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl bottom-20 right-10 animate-ping"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg"
        >
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10">
            <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Login to Your Account
            </h1>
            <p className="text-center text-gray-400 mb-8">
              Access your personalized dashboard
            </p>
            <LoginForm />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
