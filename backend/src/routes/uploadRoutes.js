const express = require('express');
const router = express.Router();
const {
    uploadImage,
    uploadResume,
    uploadProfileImage,
    uploadResumePdf
} = require('../controller/uploadController');

// POST /api/upload/image   — profile photo (jpg/png/webp, max 5MB)
router.post('/image',  uploadImage.single('image'),   uploadProfileImage);

// POST /api/upload/resume  — resume PDF (max 10MB)
router.post('/resume', uploadResume.single('resume'),  uploadResumePdf);

module.exports = router;
