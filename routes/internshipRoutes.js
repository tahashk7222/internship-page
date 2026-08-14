const express = require("express");

const {
    createInternship,
    getAllInternships
} = require("../controllers/internshipController");

const router = express.Router();

// POST /api/internships
router.post("/", createInternship);

// GET /api/internships
router.get("/", getAllInternships);

module.exports = router;