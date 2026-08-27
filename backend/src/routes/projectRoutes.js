const express = require('express')
const {GetAllProject , CreateProject , UpdateProject , DeleteProject} = require('../controller/projectController')
const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router()


router.get('/', GetAllProject)
router.post('/create',authMiddleware,CreateProject)
router.put('/update/:id' , authMiddleware, UpdateProject)
router.delete('/delete/:id',authMiddleware, DeleteProject)


module.exports = router
