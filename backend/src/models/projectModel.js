const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        required: true
    },
    descriptions: {
        type: String,
        required: true,
    },
    techStack: [{ type: String, required: true }],
    imageURL: { type: String },
    liveLINK: { type: String },
    gitHub: { type: String },
    featured: { type: Boolean, default: false }

}, {
    timestamps: true
})

const ProjectModel = mongoose.model('project', ProjectSchema)

module.exports = ProjectModel