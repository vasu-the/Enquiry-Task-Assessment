import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EnquiryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to submit an enquiry.');
      return;
    }


    if (!title || !category || !agree) {
      setError('Title, category, and agreement are required.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

   
    if (file) {
      formData.append('file', file);
    }

  
    formData.append('userId', user._id);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let responseData;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await res.json();
      } else {
        responseData = await res.text();
      }

      if (!res.ok) {
        throw new Error(
          typeof responseData === 'string'
            ? responseData
            : responseData.message || 'Submission failed'
        );
      }
      setTitle('');
      setDescription('');
      setCategory('');
      setFile(null);
      setAgree(false);
      alert('Enquiry submitted successfully!');
      navigate('/');
    } catch (err) {
      setError((err as Error).message || 'Failed to submit enquiry. Please try again.');
      console.error('Submission error:', err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Submit an Enquiry</h2>
        {error && <p className="text-red-600 p-2 bg-red-50 rounded-md">{error}</p>}

        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="search-bar w-full p-3 border rounded-md"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="search-bar w-full p-3 border rounded-md"
          rows={4}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="search-bar w-full p-3 border rounded-md"
          required
        >
          <option value="">Select category *</option>
          <option value="feedback">Feedback</option>
          <option value="issues">Issues</option>
          <option value="feature requests">Feature Requests</option>
        </select>

        <div>
          <label className="block mb-1 text-gray-700">Attachment (optional)</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
            className="mt-1 mr-2"
            required
          />
          <label htmlFor="agree" className="text-gray-700">
            I agree to the terms and conditions *
          </label>
        </div>

        <button
          type="submit"
          className={`w-full py-3 text-white font-semibold rounded-lg transition ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800'
            }`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;