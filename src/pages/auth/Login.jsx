import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex justify-center items-center bg-gray-50">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-green-100">
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
            Welcome Back 👋
          </h2>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
