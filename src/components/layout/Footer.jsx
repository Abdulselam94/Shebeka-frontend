import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white/10 backdrop-blur-md border-t border-white/10 text-gray-300 py-8 mt-auto relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          Shebeka<span className="text-green-400">.</span>
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a href="/privacy" className="hover:text-green-400 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-green-400 transition-colors">
            Terms of Service
          </a>
          <a href="/support" className="hover:text-green-400 transition-colors">
            Support
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Shebeka. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
