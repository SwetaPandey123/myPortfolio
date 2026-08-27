const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',  // free tier sender
            to: [to],
            subject: subject,
            html: html || `<p>${text}</p>`,
        });

        if (error) {
            console.error(`❌ Resend Email Error:`, error);
            throw new Error(error.message);
        }

        console.log(`✅ Resend Email sent to ${to} | ID: ${data?.id}`);
    } catch (err) {
        console.error(`⚠️ sendEmail failed: ${err.message}`);
        throw err;
    }
};

module.exports = sendEmail;