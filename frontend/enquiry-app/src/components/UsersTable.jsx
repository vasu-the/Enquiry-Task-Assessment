
// src/components/UserTable.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const toggleStatus = async (id) => {
    await axios.patch(`/admin/users/${id}/status`);
    setUsers((prev) => prev.map((u) => u._id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  };

  return (
    <table className="w-full table-auto border">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Signup Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, idx) => (
          <tr key={u._id}>
            <td>{idx + 1}</td>
            <td>{u.fullName}</td>
            <td>{u.email}</td>
            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            <td>
              <button className="btn" onClick={() => toggleStatus(u._id)}>
                {u.status}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;