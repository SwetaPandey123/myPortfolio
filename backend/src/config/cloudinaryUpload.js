const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:    process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Profile image storage
const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:         'portfolio',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        public_id:      () => 'sweta_profile_photo',
        overwrite:      true,
        transformation: [{ width: 600, height: 600, crop: 'fill', gravity: 'face' }],
    },
});

// Resume PDF storage
const resumeStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:         'portfolio',
        allowed_formats: ['pdf'],
        resource_type:  'raw',
        public_id:      () => 'Sweta_Pandey_Resume',
        overwrite:      true,
    },
});

const uploadImage  = multer({ storage: imageStorage,  limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
const uploadResume = multer({ storage: resumeStorage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

module.exports = { cloudinary, uploadImage, uploadResume };
