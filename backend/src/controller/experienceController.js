const ExperienceModel = require('../models/ExperienceModel')

const GetExperience = async (req, res) => {
    try {
        const GetAllExperience = await ExperienceModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All Experience data fetched successfully",
            data: GetAllExperience
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

const createExprience = async (req, res) => {
    try {
        let { title, organization, description, startDate, endDate, current, type, location } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            })
        }
        const CreateExperience = await ExperienceModel.create({
            title,
            organization,
            description,
            startDate,
            endDate,
            current,
            type,
            location
        })
        return res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: CreateExperience
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

const UpdateExperience = async (req, res) => {
    try {
        let { id } = req.params;
        let updatedData = req.body;

        const updatedExperience = await ExperienceModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedExperience) {
            return res.status(404).json({
                success: false,
                message: "Experience record not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            data: updatedExperience
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

const DeleteExperience = async (req, res) => {
    try {
        let { id } = req.params;

        const deletedExperience = await ExperienceModel.findByIdAndDelete(id);
        if (!deletedExperience) {
            return res.status(404).json({
                success: false,
                message: "Experience record not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
            data: deletedExperience
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

module.exports = { GetExperience, createExprience, UpdateExperience, DeleteExperience }