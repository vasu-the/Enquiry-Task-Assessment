import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" className="input" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} required />
        <button type="submit" className="btn w-full">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
