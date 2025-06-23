import { useState } from "react";
import UserTable from "../components/UserTable";
import EnquiryTable from "../components/EnquiryTable";

const AdminDashboard = () => {
  const [tab, setTab] = useState("users");

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        <button className={`btn ${tab === "users" ? "bg-blue-500 text-white" : ""}`} onClick={() => setTab("users")}>Users</button>
        <button className={`btn ${tab === "enquiries" ? "bg-blue-500 text-white" : ""}`} onClick={() => setTab("enquiries")}>Enquiries</button>
      </div>
      {tab === "users" ? <UserTable /> : <EnquiryTable />}
    </div>
  );
};

export default AdminDashboard;
