const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        requirements: {
            type: [String],
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        deadline: {
            type: Date,
            required: true
        },

        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        isClosed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Internship", internshipSchema);