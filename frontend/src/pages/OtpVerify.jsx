import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { apiFetch, setAuthToken } from "../utils/api";

const OTP_LENGTH = 6;

export default function OtpVerify() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail") || "pandeysweta612@gmail.com";

  useEffect(() => {
    if (countdown === 0) {
      setCanResend(true);
      return;
    }
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < OTP_LENGTH - 1) {
      inputs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...otp];
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setOtp(next);
    inputs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleResend = async () => {
    setCountdown(30);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError(null);

    await apiFetch("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email: adminEmail }),
    });

    inputs.current[0]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== OTP_LENGTH) return;

    setError(null);
    setLoading(true);

    const res = await apiFetch("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email: adminEmail, otp: otpString }),
    });

    setLoading(false);
    if (res?.token) {
      setAuthToken(res.token);
      navigate("/admin");
    } else {
      setError(res?.message || "Invalid OTP code. Please check your email inbox.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50/40 via-white to-gray-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-slate-800 flex items-center justify-center">
              <ShieldCheck size={28} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Verify OTP
          </h1>
          <p className="text-xs text-gray-400 text-center mb-6">
            Enter the 6-digit code sent to <span className="font-semibold text-gray-600 dark:text-gray-300">{adminEmail}</span>
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
            <div className="flex gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  className="w-11 h-13 text-center text-xl font-bold border-2 border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl focus:border-teal-500 focus:outline-none"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!otp.every((d) => d !== "") || loading}
              className="w-full py-3 bg-teal-600 dark:bg-teal-500 text-white font-semibold text-sm rounded-xl hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Verify OTP"}
            </button>
          </form>

          <div className="text-center mt-5">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Resend OTP Code
              </button>
            ) : (
              <p className="text-xs text-gray-400">
                Resend code in{" "}
                <span className="font-semibold text-gray-600 dark:text-gray-300">{countdown}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
