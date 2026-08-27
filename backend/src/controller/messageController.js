const MessageModel = require('../models/messageModel');
const sendEmail = require('../utils/sendEmail');

const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required"
            });
        }

        const newMessage = await MessageModel.create({
            name,
            email,
            message
        });

        // Send email notification to Admin if configured
        if (process.env.ADMIN_EMAIL) {
            const subject = `New Portfolio Message from ${name}`;
            const html = `
                <div style="font-family: Arial; padding: 20px;">
                    <h2>New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #4CAF50;">${message}</blockquote>
                </div>
            `;
            sendEmail(process.env.ADMIN_EMAIL, subject, message, html).catch(err => {
                console.error("Failed to send notification email:", err.message);
            });
        }

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await MessageModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await MessageModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Message deleted successfully",
            data: deleted
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = { createMessage, getMessages, deleteMessage };
