'use client';

import { useState } from 'react';

export default function ResumeViewer({ resumeUrl }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Build proper embed URL — Google Docs viewer as universal PDF embed
  const embedUrl = resumeUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`
    : '';

  // Build direct Cloudinary download URL
  const downloadUrl = resumeUrl
    ? resumeUrl.replace('/upload/', '/upload/fl_attachment/')
    : '';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-5 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold tracking-widest uppercase">
          <i className="ri-file-pdf-2-line"></i>
          Curriculum Vitae
        </div>

        <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Sweta Pandey{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Resume
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          B.Tech Computer Science Engineering · LNCT Bhopal · Full Stack Web Developer
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="Sweta_Pandey_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-900/40 transition-all hover:scale-105"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold transition-all hover:scale-105"
            >
              <i className="ri-external-link-line text-base"></i>
              Open Full Screen
            </a>
          )}
        </div>
      </div>

      {/* PDF Viewer Card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-sm">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-medium">
            <i className="ri-cloud-line text-indigo-400"></i>
            <span className="truncate max-w-xs">Hosted on Cloudinary</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-emerald-400 font-medium">Live</span>
          </div>
        </div>

        {/* Iframe */}
        <div className="relative w-full" style={{ height: '82vh', minHeight: '600px' }}>
          {/* Loading state */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0f0f11] z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <i className="ri-file-pdf-2-line text-2xl text-indigo-400"></i>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-white font-bold text-sm">Loading Resume...</p>
                <p className="text-slate-500 text-xs">Fetching from Cloudinary</p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></span>
                ))}
              </div>
            </div>
          )}

          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title="Sweta Pandey Resume"
              onLoad={() => setIframeLoaded(true)}
              allow="fullscreen"
            />
          ) : (
            /* No URL fallback */
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                <i className="ri-file-pdf-2-line text-3xl text-indigo-400"></i>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold text-lg">Resume document loading...</p>
                <p className="text-slate-500 text-sm max-w-sm">
                  Backend is warming up. Please wait a moment and refresh the page.
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom hint */}
      <p className="text-center text-slate-600 text-xs mt-5 font-medium">
        Resume fetched live from backend API · Hosted securely on Cloudinary
      </p>
    </div>
  );
}
