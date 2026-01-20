import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import RegisterForm from "../../components/forms/RegisterForm";
import NetworkBackground from "../../components/common/NetworkBackground";

const Register = () => {
  return (
    <div className="relative flex flex-col min-h-screen dark:bg-gray-900/50">
      <NetworkBackground />
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-24 relative z-10">
        <RegisterForm />
      </main>

      <Footer />
    </div>
  );
};

export default Register;
