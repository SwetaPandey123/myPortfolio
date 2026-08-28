const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'akphv6j6',
    api_key:    process.env.API_KEY    || process.env.CLOUDINARY_API_KEY    || '532818647148246',
    api_secret: process.env.API_SECRET || process.env.CLOUDINARY_API_SECRET || 'HPgG6EEwHp-AWny2VJB8YiwoaR0',
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
        resource_type:  'auto',
        public_id:      () => 'Sweta_Pandey_Resume',
        overwrite:      true,
    },
});

const uploadImage  = multer({ storage: imageStorage,  limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
const uploadResume = multer({ storage: resumeStorage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

module.exports = { cloudinary, uploadImage, uploadResume };
