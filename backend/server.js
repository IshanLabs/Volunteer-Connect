const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database Connection
const db = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize Express App
const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// ===============================
// Routes
// ===============================

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Volunteer Connect Backend Running");
});

// Test Database Connection
app.get("/test-db", async (req, res) => {

    try {

        const result = await db.query("SELECT NOW() AS current_time");

        res.status(200).json({
            success: true,
            message: "Database Connected Successfully",
            data: result.rows,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database Connection Failed",
            error: error.message,
        });

    }

});

// Application API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});