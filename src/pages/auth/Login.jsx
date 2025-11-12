import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
            Login Page
          </h1>
          <p className="text-center">Login form will go here</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
