// EmailJS — live contact form notification to pandeysweta612@gmail.com

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'service_oyjjv98';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_contact';
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'Z4HxBT3g98-f0QDi2';

export const sendEmailJSNotification = async ({ name, email, message }) => {
  try {
    const payload = {
      service_id:  SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id:     PUBLIC_KEY,
      template_params: {
        from_name:  name,
        from_email: email,
        reply_to:   email,
        to_name:    'Sweta Pandey',
        to_email:   'pandeysweta612@gmail.com',
        message:    message,
        sent_date:  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      },
    };

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn('EmailJS error response:', text);
      return false;
    }

    console.log('✅ EmailJS notification sent to pandeysweta612@gmail.com');
    return true;
  } catch (err) {
    console.warn('EmailJS failed:', err.message);
    return false;
  }
};
