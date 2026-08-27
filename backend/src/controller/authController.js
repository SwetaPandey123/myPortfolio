require('dotenv').config()
const GenerateOtp = require('../utils/generateOtp')
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

let currentOtp = null;
let otpExpiry = null;


const Login = async (req, res) => {
    try {
        let { email, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD


        if (email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({
                success: false,
                messages: " someting went worng"
            })
        };

        currentOtp = GenerateOtp()
        otpExpiry = Date.now() + 5 * 60 * 1000;
        console.log("otp --> ", currentOtp)
        const html = `
  <div style="font-family: Arial; padding: 20px;">
    <h2>Your OTP Code</h2>
    <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${currentOtp}</p>
    <p>This OTP is valid for 5 minutes.</p>
  </div>
`;

      await sendEmail(adminEmail , "your otp code ", `your otp ${currentOtp} `,html
        
      )

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            messages: "internal server error",
            error

        })
    }
}

const verifyOtp = async (req, res) => {
    try {
        let { otp } = req.body;

        if (Date.now() > otpExpiry) {
            return res.status(401).json({
                success: false,
                message: "OTP expired, please request a new one"
            });
        }

        if (Number(otp) !== currentOtp) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        currentOtp = null;

        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "60m" })

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            token
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            messages: "internal server error",
            error

        })
    }
}


const ResendOtp = async (req, res) => {
    try {
        currentOtp = GenerateOtp();
        otpExpiry = Date.now() + 5 * 60 * 1000;

        console.log("new otp --> ", currentOtp);

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        });
    }
}


module.exports = { Login, verifyOtp, ResendOtp }