const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Enquiry = require("../models/enquiryModel");

// Admin login with hardcoded credentials from .env
exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        return res.status(200).json({ data: token, message: " Admin-Login Successfully" });
    }

    return res.status(401).json({ message: "Invalid admin credentials" });
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.status(200).json({ data: users, message: "Get All Users" });
    } catch {
        return res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Toggle active/inactive user status
exports.toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isActive = !user.isActive;
        await user.save();

        return res.json({ message: "User status updated", isActive: user.isActive });
    } catch {
        return res.status(500).json({ message: "Failed to update status" });
    }
};

// Get all enquiries
exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .populate("userId", "fullName email")
            .sort({ createdAt: -1 });

        return res.status(200).json({ data: enquiries, message: "Get all Enquiries" });
    } catch {
        return res.status(500).json({ message: "Failed to fetch enquiries" });
    }
};
