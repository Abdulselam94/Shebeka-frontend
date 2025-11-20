import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
