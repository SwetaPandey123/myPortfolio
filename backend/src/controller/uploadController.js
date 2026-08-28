const { cloudinary, uploadImage, uploadResume } = require('../config/cloudinaryUpload');
const resumeModel = require('../models/resumeModel');

// Upload Profile Image → Cloudinary → return URL
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

        const imageUrl = req.file.path; // Cloudinary secure URL
        console.log('✅ Profile image uploaded:', imageUrl);

        return res.status(200).json({
            success: true,
            message: 'Profile image uploaded to Cloudinary!',
            url: imageUrl,
        });
    } catch (error) {
        console.error('Profile upload error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Upload Resume PDF → Cloudinary → save URL to MongoDB
const uploadResumePdf = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

        const resumeUrl = req.file.path; // Cloudinary secure URL
        console.log('✅ Resume PDF uploaded:', resumeUrl);

        // Auto-save to MongoDB
        await resumeModel.findOneAndUpdate(
            {},
            { resumeUrl },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Resume uploaded to Cloudinary and saved!',
            url: resumeUrl,
        });
    } catch (error) {
        console.error('Resume upload error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { uploadImage, uploadResume, uploadProfileImage, uploadResumePdf };
