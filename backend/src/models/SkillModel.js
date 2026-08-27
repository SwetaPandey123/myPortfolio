const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name is required"]
    },
    proficiency: {
        type: String,
        default: "100%"
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    icon: {
        type: String,
        required: [true, "Icon is required"]
    }
}, {
    timestamps: true
});

const SkillsModel = mongoose.model('Skills', SkillsSchema);
module.exports = SkillsModel;