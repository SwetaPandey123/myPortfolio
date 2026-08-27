'use client';

import { useState, useEffect } from 'react';
import { loginAdmin, verifyAdminOtp, resendAdminOtp } from '@/utils/api';
import AdminDashboard from '@/components/AdminDashboard';
import Link from 'next/link';

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await loginAdmin(email.trim(), password.trim());
      if (res.success) {
        setMessage('OTP sent to your registered email! Please check your inbox.');
        setStep('otp');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await verifyAdminOtp(otp.trim());
      if (res.success && res.token) {
        localStorage.setItem('adminToken', res.token);
        setToken(res.token);
      } else {
        setError(res.message || 'Verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await resendAdminOtp();
      if (res.success) {
        setMessage('New OTP code generated!');
        if (res.otpCode) {
          setOtp(String(res.otpCode));
        }
      }
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setStep('credentials');
    setPassword('');
    setOtp('');
  };

  if (token) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-slate-200 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
              SP
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Admin Portal Login</h1>
          <p className="text-xs text-slate-500 font-medium">
            Protected OTP Authentication System
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
            <i className="ri-error-warning-fill text-lg text-rose-600"></i>
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
            <i className="ri-checkbox-circle-fill text-lg text-emerald-600"></i>
            <span>{message}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-12 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={showPassword ? 'ri-eye-off-line text-lg' : 'ri-eye-line text-lg'}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white font-bold gradient-bg hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-lg"></i>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Send Login OTP</span>
                  <i className="ri-key-2-line text-lg"></i>
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5 text-center">
                Enter 6-Digit OTP Code
              </label>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="123456"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center text-2xl tracking-widest font-extrabold text-indigo-600 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white font-bold gradient-bg hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-lg"></i>
                  <span>Verifying OTP...</span>
                </>
              ) : (
                <>
                  <span>Verify & Access Dashboard</span>
                  <i className="ri-shield-check-line text-lg"></i>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs font-semibold pt-2">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-indigo-600 hover:underline"
              >
                Resend OTP Code
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="text-slate-500 hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <Link href="/" className="text-xs text-slate-500 hover:text-indigo-600 font-semibold">
            ← Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
