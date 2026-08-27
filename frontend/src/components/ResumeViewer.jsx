'use client';

import { useState } from 'react';

export default function ResumeViewer({ resumeUrl }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [useGoogleViewer, setUseGoogleViewer] = useState(false);

  // Try direct PDF embed first, fallback to Google Docs viewer
  const directUrl = resumeUrl || '';
  const googleUrl = resumeUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`
    : '';

  const embedUrl = useGoogleViewer ? googleUrl : directUrl;

  const downloadUrl = resumeUrl
    ? resumeUrl.replace('/upload/', '/upload/fl_attachment/')
    : '';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center space-y-4">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase">
            <i className="ri-file-pdf-2-line"></i>
            Curriculum Vitae
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Sweta Pandey{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Resume
            </span>
          </h1>

          {/* Subtitle — updated with July 2026 passout */}
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
            B.Tech CSE — LNCT Bhopal&nbsp;·&nbsp;Passout July 2026&nbsp;·&nbsp;Full Stack Web Developer
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {downloadUrl && (
              <a
                href={downloadUrl}
                download="Sweta_Pandey_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
              >
                <i className="ri-download-2-line text-base"></i>
                Download PDF
              </a>
            )}
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5"
              >
                <i className="ri-external-link-line text-base"></i>
                Open Full Screen
              </a>
            )}
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg">

          {/* Browser-style top bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-100 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 text-xs font-medium shadow-sm max-w-xs truncate">
              <i className="ri-cloud-line text-indigo-500 shrink-0"></i>
              <span className="truncate">res.cloudinary.com · Sweta_Pandey_Resume.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-emerald-600 font-semibold">Live</span>
            </div>
          </div>

          {/* Iframe area */}
          <div className="relative w-full bg-slate-50" style={{ height: '80vh', minHeight: '600px' }}>

            {/* Loading spinner */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-50 z-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-file-pdf-2-line text-2xl text-indigo-500"></i>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-slate-800 font-bold text-sm">Loading Resume...</p>
                  <p className="text-slate-400 text-xs">Fetching from Cloudinary</p>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            {embedUrl ? (
              <iframe
                key={embedUrl}
                src={embedUrl}
                className="w-full h-full border-0"
                title="Sweta Pandey Resume"
                onLoad={() => setIframeLoaded(true)}
                allow="fullscreen"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-file-pdf-2-line text-3xl text-indigo-500"></i>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-800 font-bold text-lg">Resume loading...</p>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Backend is warming up. Please wait a moment and refresh.
                  </p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all"
                >
                  Refresh Page
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Switch viewer + hint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <p className="text-slate-400 text-xs font-medium">
            Resume hosted securely on Cloudinary · Fetched via backend API
          </p>
          {resumeUrl && (
            <button
              onClick={() => { setUseGoogleViewer(v => !v); setIframeLoaded(false); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 text-xs font-semibold shadow-sm transition-all hover:border-indigo-200"
            >
              <i className="ri-refresh-line"></i>
              {useGoogleViewer ? 'Switch to Direct View' : 'Switch to Google Viewer'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
