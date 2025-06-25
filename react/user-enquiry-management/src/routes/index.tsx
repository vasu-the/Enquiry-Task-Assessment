import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Admin from '../pages/Admin';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  </Router>
);

export default AppRoutes;