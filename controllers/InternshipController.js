const Internship = require("../models/Internship");

// Create a new internship
const createInternship = async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            requirements,
            duration,
            deadline,
            teacherId
        } = req.body;

        // Check required fields
        if (
            !title ||
            !company ||
            !description ||
            !requirements ||
            !duration ||
            !deadline ||
            !teacherId
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // Create internship
        const internship = await Internship.create({
            title,
            company,
            description,
            requirements,
            duration,
            deadline,
            teacherId
        });

        res.status(201).json({
            success: true,
            message: "Internship created successfully",
            internship
        });

    } catch (error) {
        console.error("Create Internship Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create internship"
        });
    }
};


// Get all internships
const getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: internships.length,
            internships
        });

    } catch (error) {
        console.error("Get Internships Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch internships"
        });
    }
};


module.exports = {
    createInternship,
    getAllInternships
};