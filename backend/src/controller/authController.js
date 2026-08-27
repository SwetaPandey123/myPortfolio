require('dotenv').config();
const GenerateOtp = require('../utils/generateOtp');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

let currentOtp = null;
let otpExpiry = null;

const Login = async (req, res) => {
    try {
        let { email, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : '';
        const adminPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : '';

        const inputEmail = email ? email.trim() : '';
        const inputPassword = password ? password.trim() : '';

        if (inputEmail !== adminEmail || inputPassword !== adminPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        currentOtp = GenerateOtp();
        otpExpiry = Date.now() + 5 * 60 * 1000;
        console.log("🔐 Admin OTP Generated ->", currentOtp);

        const html = `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
            <h2 style="color: #4F46E5;">Sweta Pandey Portfolio Admin OTP</h2>
            <p style="font-size: 28px; font-weight: bold; color: #10B981; letter-spacing: 4px;">${currentOtp}</p>
            <p style="color: #64748B;">This OTP is valid for 5 minutes.</p>
          </div>
        `;

        try {
            await sendEmail(adminEmail, "Your Sweta Pandey Portfolio Admin OTP", `Your OTP is ${currentOtp}`, html);
        } catch (emailErr) {
            console.error("⚠️ Nodemailer Email Error (fallback active):", emailErr.message);
        }

        return res.status(200).json({
            success: true,
            message: "OTP generated successfully! Check your email or console.",
            // In case email delivery is delayed on cloud, return otp in non-production or for admin verification convenience
            devOtp: process.env.NODE_ENV !== 'production' ? currentOtp : undefined
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during login",
            error: error.message
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        let { otp } = req.body;

        if (!otpExpiry || Date.now() > otpExpiry) {
            return res.status(401).json({
                success: false,
                message: "OTP expired, please request a new one"
            });
        }

        if (String(otp).trim() !== String(currentOtp).trim()) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP code"
            });
        }

        currentOtp = null;
        otpExpiry = null;

        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || 'SWETA_PANDEY_SECRET', { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            token
        });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during OTP verification",
            error: error.message
        });
    }
};

const ResendOtp = async (req, res) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : '';
        currentOtp = GenerateOtp();
        otpExpiry = Date.now() + 5 * 60 * 1000;

        console.log("🔐 Resent Admin OTP ->", currentOtp);

        const html = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Your New Admin OTP Code</h2>
            <p style="font-size: 28px; font-weight: bold; color: #10B981;">${currentOtp}</p>
            <p>This OTP is valid for 5 minutes.</p>
          </div>
        `;

        try {
            await sendEmail(adminEmail, "Your New Sweta Pandey Admin OTP", `Your OTP is ${currentOtp}`, html);
        } catch (emailErr) {
            console.error("⚠️ Nodemailer Resend Email Error:", emailErr.message);
        }

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully"
        });
    } catch (error) {
        console.error("Resend OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during resend OTP",
            error: error.message
        });
    }
};

module.exports = { Login, verifyOtp, ResendOtp };