const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Internship Backend is Running"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});