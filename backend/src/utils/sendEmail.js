const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // TLS
            requireTLS: true,
            family: 4, // Force IPv4 - Render free tier blocks IPv6 SMTP
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: `"Sweta Pandey Portfolio" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log(`📧 Email sent successfully to ${to}`);
    } catch (err) {
        console.error(`⚠️ Email send failed: ${err.message}`);
        throw err;
    }
};

module.exports = sendEmail;