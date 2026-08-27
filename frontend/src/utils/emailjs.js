// EmailJS utility for sending live email notifications to pandeysweta612@gmail.com

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_portfolio';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_portfolio';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'user_sweta_612';

export const sendEmailJSNotification = async ({ name, email, message }) => {
  try {
    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        from_name: name,
        reply_to: email,
        to_email: 'pandeysweta612@gmail.com',
        message: message,
        sent_date: new Date().toLocaleString()
      }
    };

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return res.ok;
  } catch (err) {
    console.warn('EmailJS live notification attempt:', err.message);
    return false;
  }
};
