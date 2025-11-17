const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-900">
          Shebeka<span className="text-blue-600">Jobs</span>
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a
            href="/privacy"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/support"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Support
          </a>
          <a
            href="/contact"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ShebekaJobs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
