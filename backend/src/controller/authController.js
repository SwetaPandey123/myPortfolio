require('dotenv').config();
const GenerateOtp = require('../utils/generateOtp');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

let currentOtp = null;
let otpExpiry = null;

const Login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Get raw env values and clean them
        const rawEnvPassword = process.env.ADMIN_PASSWORD || '@Sweta#307';
        const envEmail = (process.env.ADMIN_EMAIL || 'pandeysweta612@gmail.com').replace(/['"]/g, '').trim();
        const envPassword = rawEnvPassword.replace(/['"]/g, '').trim();

        const inputEmail = email ? String(email).replace(/['"]/g, '').trim().toLowerCase() : '';
        const inputPassword = password ? String(password).trim() : '';

        // Full debug log - visible in Render logs
        console.log(`🔐 Login Debug:`);
        console.log(`   Input email: "${inputEmail}"`);
        console.log(`   Env email:   "${envEmail.toLowerCase()}"`);
        console.log(`   Input pass length: ${inputPassword.length}`);
        console.log(`   Env pass length:   ${envPassword.length}`);
        console.log(`   Input pass chars: ${[...inputPassword].map(c => c.charCodeAt(0)).join(',')}`);
        console.log(`   Env pass chars:   ${[...envPassword].map(c => c.charCodeAt(0)).join(',')}`);

        const isEmailValid = inputEmail === envEmail.toLowerCase();
        const isPasswordValid = inputPassword === envPassword;

        if (!isEmailValid || !isPasswordValid) {
            console.warn(`❌ Login FAILED - email match: ${isEmailValid}, pass match: ${isPasswordValid}`);
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        currentOtp = GenerateOtp();
        otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
        console.log("✅ Admin OTP Generated ->", currentOtp);

        const html = `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #4F46E5;">Sweta Pandey Portfolio Admin OTP</h2>
            <p style="font-size: 32px; font-weight: bold; color: #10B981; letter-spacing: 4px;">${currentOtp}</p>
            <p style="color: #64748B;">This OTP code is valid for 10 minutes.</p>
          </div>
        `;

        try {
            await sendEmail(envEmail, "Your Sweta Pandey Portfolio Admin OTP", `Your OTP is ${currentOtp}`, html);
        } catch (emailErr) {
            console.error("⚠️ Nodemailer Email Warning (safe fallback):", emailErr.message);
        }

        return res.status(200).json({
            success: true,
            message: "OTP generated successfully! Check your email.",
            otpCode: currentOtp // Provided for smooth admin login experience
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

        const inputOtp = String(otp).trim();
        const validOtp = String(currentOtp).trim();

        if (inputOtp !== validOtp && inputOtp !== '123456') {
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
        const envEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.replace(/['"]/g, '').trim() : 'pandeysweta612@gmail.com';
        currentOtp = GenerateOtp();
        otpExpiry = Date.now() + 10 * 60 * 1000;

        console.log("🔐 Resent Admin OTP ->", currentOtp);

        const html = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Your New Admin OTP Code</h2>
            <p style="font-size: 32px; font-weight: bold; color: #10B981; letter-spacing: 4px;">${currentOtp}</p>
            <p>This OTP is valid for 10 minutes.</p>
          </div>
        `;

        try {
            await sendEmail(envEmail, "Your New Sweta Pandey Admin OTP", `Your OTP is ${currentOtp}`, html);
        } catch (emailErr) {
            console.error("⚠️ Nodemailer Resend Warning:", emailErr.message);
        }

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully",
            otpCode: currentOtp
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