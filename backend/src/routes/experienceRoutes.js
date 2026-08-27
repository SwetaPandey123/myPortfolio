const express = require('express')
const {GetExperience , createExprience , UpdateExperience , DeleteExperience} = require('../controller/experienceController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/' , GetExperience)
router.post('/create' ,authMiddleware, createExprience)
router.put('/update/:id' ,authMiddleware, UpdateExperience)
router.delete('/delete/:id' ,authMiddleware , DeleteExperience)

module.exports = router