'use client';

import { useState } from 'react';
import { sendMessage } from '@/utils/api';
import { sendEmailJSNotification } from '@/utils/emailjs';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // 1. Send to Backend API (MongoDB + Nodemailer Alert)
      const res = await sendMessage(formData);

      // 2. Send via EmailJS (Client-side live notification)
      sendEmailJSNotification(formData).catch(err => {
        console.warn('EmailJS secondary delivery status:', err);
      });

      if (res.success) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! A live email notification has been dispatched to pandeysweta612@gmail.com and saved to the database.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: res.message || 'Failed to send message.' });
      }
    } catch (err) {
      // Fallback: try EmailJS directly if backend endpoint is unavailable
      const emailjsSuccess = await sendEmailJSNotification(formData);
      if (emailjsSuccess) {
        setStatus({
          type: 'success',
          message: 'Message delivered via EmailJS to pandeysweta612@gmail.com!'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: err.response?.data?.message || 'Server error. Please try again later.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <i className="ri-mail-open-line text-sm"></i>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Let's Connect & <span className="gradient-text">Collaborate</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Send a message below. Messages are saved to the MongoDB database and trigger live email notifications to pandeysweta612@gmail.com.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Information Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/80 bg-white">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">
                <i className="ri-mail-send-line"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Email Address</h3>
                <p className="text-slate-500 text-xs">Live EmailJS + Nodemailer alerts</p>
                <a
                  href="mailto:pandeysweta612@gmail.com"
                  className="text-indigo-600 font-bold text-base hover:underline mt-1 block"
                >
                  pandeysweta612@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/80 bg-white">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-2xl">
                <i className="ri-phone-line"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Phone Number</h3>
                <p className="text-slate-500 text-xs">Direct Call / WhatsApp</p>
                <a
                  href="tel:+919832165044"
                  className="text-slate-900 font-bold text-base hover:text-indigo-600 mt-1 block"
                >
                  +91-9832165044
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/80 bg-white">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 text-2xl">
                <i className="ri-map-pin-2-line"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Location</h3>
                <p className="text-slate-500 text-xs">Current Residence</p>
                <span className="text-slate-800 font-semibold text-sm mt-1 block">
                  Bhopal, Madhya Pradesh, India (Native: West Bengal)
                </span>
              </div>
            </div>

            {/* Social Channels List */}
            <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/80 bg-white">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Social Channels</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/in/sweta-pandey-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all"
                >
                  <i className="ri-linkedin-fill text-sm"></i>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/_sweta__pandey?igsi=MWdpazM2cXNocTNqaQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all"
                >
                  <i className="ri-instagram-line text-sm"></i>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/share/1Dfd99FRPW/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all"
                >
                  <i className="ri-facebook-fill text-sm"></i>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://x.com/SwetaPandey612"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all"
                >
                  <i className="ri-twitter-x-line text-sm"></i>
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-indigo-500/5">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send Me a Message</h3>

              {status.message && (
                <div
                  className={`p-4 rounded-2xl mb-6 text-sm font-semibold flex items-center space-x-2 ${
                    status.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <i
                    className={
                      status.type === 'success'
                        ? 'ri-checkbox-circle-fill text-emerald-600 text-xl'
                        : 'ri-error-warning-fill text-rose-600 text-xl'
                    }
                  ></i>
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    required
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-white font-bold btn-gradient hover:opacity-95 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-xl"></i>
                      <span>Sending Message & Dispatched Notification...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message Now</span>
                      <i className="ri-send-plane-fill text-lg"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
