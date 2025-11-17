import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-24">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
};

export default Login;
