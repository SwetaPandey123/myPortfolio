const express = require('express')
const {Login , verifyOtp , ResendOtp} = require('../controller/authController')

const router = express.Router()

router.post('/login' ,Login)
router.post('/verifyOtp' , verifyOtp)
router.post('/resend-otp', ResendOtp)

module.exports = router