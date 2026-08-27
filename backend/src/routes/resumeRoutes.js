const express = require('express')
const {GetResumeController , UpdateResumecontroller} = require('../controller/resumeController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/view', GetResumeController)
router.put('/update',authMiddleware, UpdateResumecontroller)

module.exports = router