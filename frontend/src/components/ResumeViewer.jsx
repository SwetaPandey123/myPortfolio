'use client';

import { useState } from 'react';

export default function ResumeViewer({ resumeUrl }) {
  const [viewMode, setViewMode] = useState('image'); // 'image' | 'google' | 'pdf'
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // If Cloudinary URL ends with .pdf or contains /upload/, generate HD .jpg image preview URL
  const jpgPreviewUrl = resumeUrl
    ? (resumeUrl.includes('/image/upload/')
        ? resumeUrl.replace(/\.pdf$/i, '.jpg')
        : (resumeUrl.includes('/upload/') ? resumeUrl.replace('/upload/', '/upload/f_jpg,q_auto/') : ''))
    : '';

  const googleUrl = resumeUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`
    : '';

  const handleDownloadPdf = async () => {
    if (!resumeUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'Sweta_Pandey_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(resumeUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

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

          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
            B.Tech CSE — LNCT Bhopal&nbsp;·&nbsp;Passout July 2026&nbsp;·&nbsp;Full Stack Web Developer
          </p>

          {/* View Mode Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {jpgPreviewUrl && (
              <button
                onClick={() => setViewMode('image')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'image'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <i className="ri-image-line text-sm"></i>
                <span>HD Visual View</span>
              </button>
            )}

            <button
              onClick={() => { setViewMode('google'); setIframeLoaded(false); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'google'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="ri-file-search-line text-sm"></i>
              <span>Google Docs Viewer</span>
            </button>

            {resumeUrl && (
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
              >
                {downloading ? (
                  <><i className="ri-loader-4-line text-sm animate-spin"></i> Downloading...</>
                ) : (
                  <><i className="ri-download-2-line text-sm"></i> Download PDF</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PDF / Image Viewer Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">

          {/* Browser-style top bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-100 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 text-xs font-medium shadow-sm max-w-xs truncate">
              <i className="ri-shield-check-line text-emerald-500 shrink-0"></i>
              <span className="truncate">Sweta_Pandey_Resume.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-emerald-600 font-semibold">Live</span>
            </div>
          </div>

          {/* Content display */}
          <div className="relative w-full bg-slate-100 flex items-center justify-center p-4 sm:p-6 min-h-[600px]">
            {viewMode === 'image' && jpgPreviewUrl ? (
              <div className="w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-slate-200 bg-white">
                <img
                  src={jpgPreviewUrl}
                  alt="Sweta Pandey Resume"
                  className="w-full h-auto object-contain block"
                />
              </div>
            ) : viewMode === 'google' && googleUrl ? (
              <div className="relative w-full h-[800px]">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                    <i className="ri-loader-4-line text-3xl text-indigo-600 animate-spin"></i>
                    <p className="text-xs font-bold text-slate-600">Loading Google Viewer...</p>
                  </div>
                )}
                <iframe
                  src={googleUrl}
                  className="w-full h-full border-0 rounded-xl shadow-inner"
                  title="Sweta Pandey Resume Google Viewer"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            ) : (
              <div className="text-center space-y-4 py-16">
                <i className="ri-file-pdf-2-line text-5xl text-indigo-500"></i>
                <p className="text-slate-700 font-bold">Resume PDF Ready</p>
                {resumeUrl && (
                  <button
                    onClick={handleDownloadPdf}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 disabled:opacity-60 cursor-pointer"
                  >
                    <i className="ri-download-line text-lg"></i>
                    <span>Download Resume PDF</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
