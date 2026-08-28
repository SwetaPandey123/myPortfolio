const resumeModel = require("../models/resumeModel");

const GetResumeController = async (req, res) => {
    try {
        const resume = await resumeModel.findOne();
        return res.status(200).json({
            success: true,
            message: "resume fetched successfully",
            data: resume
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error", error });
    }
};

const UpdateResumecontroller = async (req, res) => {
    try {
        const { url } = req.body;
        const updated = await resumeModel.findOneAndUpdate(
            {},
            { resumeUrl: url },
            { new: true, upsert: true }
        );
        return res.status(200).json({ success: true, message: "resume updated successfully", data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error", error });
    }
};

module.exports = { GetResumeController, UpdateResumecontroller };