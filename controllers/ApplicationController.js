const Application = require("../models/Application");
const Internship = require("../models/Internship");


// Apply for an internship
const applyForInternship = async (req, res) => {
    try {
        const {
            internshipId,
            userId,
            coverNote
        } = req.body;

        // Check required fields
        if (!internshipId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Internship ID and User ID are required"
            });
        }

        // Check if internship exists
        const internship = await Internship.findById(internshipId);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            });
        }

        // Check if internship was manually closed
        if (internship.isClosed) {
            return res.status(400).json({
                success: false,
                message: "Applications for this internship are closed"
            });
        }

        // Check deadline
        if (new Date() > new Date(internship.deadline)) {
            return res.status(400).json({
                success: false,
                message: "The application deadline has passed"
            });
        }

        // Check if student already applied
        const existingApplication = await Application.findOne({
            internshipId,
            userId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this internship"
            });
        }

        // Create application
        const application = await Application.create({
            internshipId,
            userId,
            coverNote
        });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error("Apply Internship Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit application"
        });
    }
};


// Get all applications for an internship
const getApplications = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if internship exists
        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            });
        }

        // Get applications
        const applications = await Application.find({
            internshipId: id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error("Get Applications Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch applications"
        });
    }
};


// Evaluate an application
const evaluateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, feedback } = req.body;

        // Check status
        const allowedStatuses = [
            "Reviewed",
            "Selected",
            "Rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status"
            });
        }

        // Find application
        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        // Update application
        application.status = status;

        if (feedback !== undefined) {
            application.feedback = feedback;
        }

        await application.save();

        res.status(200).json({
            success: true,
            message: "Application evaluated successfully",
            application
        });

    } catch (error) {
        console.error("Evaluate Application Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to evaluate application"
        });
    }
};


module.exports = {
    applyForInternship,
    getApplications,
    evaluateApplication
};