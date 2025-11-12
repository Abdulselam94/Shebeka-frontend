import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login as loginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi(form);
      login(res.data.token); // save JWT
      // redirect based on role
      const userRole = JSON.parse(atob(res.data.token.split(".")[1])).role;
      if (userRole === "admin") navigate("/admin/dashboard");
      else if (userRole === "recruiter") navigate("/recruiter/dashboard");
      else navigate("/applier/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="text-sm text-center text-gray-600 mt-2">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-green-700 font-medium hover:underline"
        >
          Register
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
