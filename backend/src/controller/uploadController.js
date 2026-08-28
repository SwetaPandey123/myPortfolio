const { cloudinary, uploadImage, uploadResume } = require('../config/cloudinaryUpload');
const resumeModel = require('../models/resumeModel');

const PROFILE_PUBLIC_ID = 'portfolio/sweta_profile_photo';
const RESUME_PUBLIC_ID  = 'portfolio/Sweta_Pandey_Resume';

// GET /api/upload/settings — return current profileImageUrl + resumeUrl
const getSettings = async (req, res) => {
    try {
        const settings = await resumeModel.findOne().sort({ updatedAt: -1 });
        return res.status(200).json({
            success: true,
            profileImageUrl: settings?.profileImageUrl || '',
            resumeUrl:       settings?.resumeUrl || settings?.resumeURL || '',
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// POST /api/upload/image — upload new profile photo
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

        const imageUrl = req.file.path;
        console.log('✅ Profile image uploaded:', imageUrl);

        // Save to MongoDB
        await resumeModel.findOneAndUpdate(
            {},
            { profileImageUrl: imageUrl },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Profile image uploaded!',
            url: imageUrl,
        });
    } catch (error) {
        console.error('Profile upload error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/upload/image — remove profile photo from Cloudinary + DB
const deleteProfileImage = async (req, res) => {
    try {
        await cloudinary.uploader.destroy(PROFILE_PUBLIC_ID);
        await resumeModel.findOneAndUpdate({}, { profileImageUrl: '' }, { upsert: true });
        console.log('🗑️  Profile image deleted');
        return res.status(200).json({ success: true, message: 'Profile image deleted' });
    } catch (err) {
        console.error('Profile delete error:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// POST /api/upload/resume — upload new resume PDF + save to DB
const uploadResumePdf = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

        const resumeUrl = req.file.path;
        console.log('✅ Resume PDF uploaded:', resumeUrl);

        await resumeModel.findOneAndUpdate(
            {},
            { resumeUrl },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Resume uploaded and saved!',
            url: resumeUrl,
        });
    } catch (error) {
        console.error('Resume upload error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/upload/resume — remove resume from Cloudinary + DB
const deleteResumePdf = async (req, res) => {
    try {
        await cloudinary.uploader.destroy(RESUME_PUBLIC_ID, { resource_type: 'raw' });
        await resumeModel.findOneAndUpdate({}, { resumeUrl: '' }, { upsert: true });
        console.log('🗑️  Resume deleted');
        return res.status(200).json({ success: true, message: 'Resume deleted' });
    } catch (err) {
        console.error('Resume delete error:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { uploadImage, uploadResume, getSettings, uploadProfileImage, deleteProfileImage, uploadResumePdf, deleteResumePdf };
