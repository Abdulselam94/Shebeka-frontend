import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import LoginForm from "../../components/forms/LoginForm";
import NetworkBackground from "../../components/common/NetworkBackground";

const Login = () => {
  return (
    <div className="relative flex flex-col min-h-screen dark:bg-gray-900/50">
      <NetworkBackground />
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-24 relative z-10">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
};

export default Login;
