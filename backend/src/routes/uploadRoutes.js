const express = require('express');
const router = express.Router();
const {
    uploadImage,
    uploadResume,
    getSettings,
    uploadProfileImage,
    deleteProfileImage,
    uploadResumePdf,
    deleteResumePdf,
} = require('../controller/uploadController');

// GET  /api/upload/settings — fetch current profileImageUrl + resumeUrl
router.get('/settings', getSettings);

// POST /api/upload/image   — upload profile photo (replaces old)
router.post('/image',   uploadImage.single('image'),   uploadProfileImage);

// DELETE /api/upload/image — delete profile photo
router.delete('/image', deleteProfileImage);

// POST /api/upload/resume  — upload resume PDF (replaces old)
router.post('/resume',  uploadResume.single('resume'),  uploadResumePdf);

// DELETE /api/upload/resume — delete resume PDF
router.delete('/resume', deleteResumePdf);

module.exports = router;
