const express = require('express')
const {GetAllSkill , updateskill , createSkill , DeletSkill} = require('../controller/skillController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', GetAllSkill)
router.post('/create',authMiddleware,createSkill)
router.put('/update/:id',authMiddleware , updateskill)
router.delete('/delete/:id' ,authMiddleware, DeletSkill)

module.exports = router
