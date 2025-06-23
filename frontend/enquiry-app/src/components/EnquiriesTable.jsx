import { useEffect, useState } from "react";
import axios from "axios";

const EnquiriesTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const fetchEnquiries = async () => {
    try {
      const { data } = await axios.get("/api/admin/enquiries");
      setEnquiries(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load enquiries");
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filtered = category
    ? enquiries.filter((q) => q.category === category)
    : enquiries;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enquiries</h2>

      <div className="mb-4">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option value="">All Categories</option>
          <option value="Feedback">Feedback</option>
          <option value="Issue">Issue</option>
          <option value="Feature Request">Feature Request</option>
        </select>
      </div>

      {loading ? (
        <p>Loading enquiries...</p>
      ) : (
        <table className="min-w-full bg-white border text-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q._id}>
                <td className="px-2">{q._id.slice(-6)}</td>
                <td className="px-2">{q.user?.fullName}</td>
                <td className="px-2">{q.user?.email}</td>
                <td className="px-2">{q.title}</td>
                <td className="px-2">{q.category}</td>
                <td className="px-2">
                  {new Date(q.createdAt).toLocaleDateString()}
                </td>
                <td className="px-2">
                  {q.file ? (
                    <a
                      href={`http://localhost:5000/uploads/${q.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnquiriesTable;
