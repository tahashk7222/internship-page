const express = require("express");

const {
    applyForInternship,
    getApplications,
    evaluateApplication
} = require("../controllers/applicationController");

const router = express.Router();

// POST /api/applications
router.post("/", applyForInternship);

// GET /api/applications/internship/:id
router.get("/internship/:id", getApplications);

// PUT /api/applications/:id/evaluate
router.put("/:id/evaluate", evaluateApplication);

module.exports = router;