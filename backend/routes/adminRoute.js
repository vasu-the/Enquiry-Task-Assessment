const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getUsers,
  toggleUserStatus,
  getEnquiries,
} = require("../controllers/adminController");

const adminAuth = require("../middlewares/adminMiddleware");

// Admin login (no auth)
router.post("/login", adminLogin);

// Protected routes
router.get("/users", adminAuth, getUsers);
router.patch("/user/:id/status", adminAuth, toggleUserStatus);
router.get("/enquiries", adminAuth, getEnquiries);

module.exports = router;
