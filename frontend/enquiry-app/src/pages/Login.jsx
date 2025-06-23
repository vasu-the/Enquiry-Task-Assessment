import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data);
      navigate(res.data.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" className="input" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} required />
        <button type="submit" className="btn w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
