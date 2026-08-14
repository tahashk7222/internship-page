const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        internshipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        coverNote: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["Applied", "Reviewed", "Selected", "Rejected"],
            default: "Applied"
        },

        feedback: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

applicationSchema.index(
    { internshipId: 1, userId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);