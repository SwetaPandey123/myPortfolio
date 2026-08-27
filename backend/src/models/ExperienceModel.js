
const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "title is required"]
    },
    organization: {
        type: String
    },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    type: { type: String, enum: ["work", "education"] },
    location: { type: String }
}, {
    timestamps: true
})

const ExperienceModel = mongoose.model("Experience", ExperienceSchema)
module.exports = ExperienceModel