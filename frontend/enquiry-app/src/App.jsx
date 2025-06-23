import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => (
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={
      <ProtectedRoute role="user">
        <UserDashboard />
      </ProtectedRoute>
    } />
    <Route path="/admin" element={
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    } />
  </Routes>
);

export default App;
