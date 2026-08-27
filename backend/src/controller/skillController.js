const SkillsModel = require('../models/SkillModel')

const GetAllSkill = async (req, res) => {
    try {
        const AllSkills = await SkillsModel.find();
        return res.status(200).json({
            success: true,
            message: "All skills fetched successfully",
            data: AllSkills
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

const createSkill = async (req, res) => {
    try {
        let { Name, proficiency, category, icon } = req.body;

        if (!Name || !proficiency || !category || !icon) {
            return res.status(400).json({
                success: false,
                message: "All fields (Name, proficiency, category, icon) are required",
            })
        }
        const createdSkill = await SkillsModel.create({
            Name,
            proficiency,
            category,
            icon
        })

        return res.status(201).json({
            success: true,
            message: "Skill created successfully",
            data: createdSkill
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

const updateskill = async (req, res) => {
    try {
        let { id } = req.params;
        let update = req.body;

        const updatedskill = await SkillsModel.findByIdAndUpdate(id, update, { new: true });
        if (!updatedskill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            data: updatedskill
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

const DeletSkill = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteskills = await SkillsModel.findByIdAndDelete(id);
        if (!deleteskills) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Skill deleted successfully",
            data: deleteskills
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

module.exports = { GetAllSkill, createSkill, updateskill, DeletSkill }