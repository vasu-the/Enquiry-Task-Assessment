// src/components/EnquiryForm.jsx
import React, { useState } from "react";
import axios from "../utils/axiosInstance";

const EnquiryForm = () => {
  const [form, setForm] = useState({ title: "", description: "", category: "Feedback", agreement: false });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreement) return alert("You must agree to continue");
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (file) data.append("file", file);
    setLoading(true);
    try {
      await axios.post("/enquiries", data);
      setMessage("Enquiry submitted successfully");
      setForm({ title: "", description: "", category: "Feedback", agreement: false });
      setFile(null);
    } catch (err) {
      setMessage("Submission failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="input" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea className="input" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <select name="category" className="input" value={form.category} onChange={handleChange}>
        <option>Feedback</option>
        <option>Issue</option>
        <option>Feature Request</option>
      </select>
      <input type="file" accept=".pdf,.docx,.jpg,.png" onChange={handleFile} />
      <label className="block">
        <input type="checkbox" name="agreement" checked={form.agreement} onChange={(e) => setForm({ ...form, agreement: e.target.checked })} /> Agree to terms
      </label>
      <button className="btn" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EnquiryForm;
