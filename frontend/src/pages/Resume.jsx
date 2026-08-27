import { useEffect, useState } from "react";
import { ExternalLink, Download, FileText } from "lucide-react";
import { apiFetch } from "../utils/api";

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState("https://drive.google.com/file/d/your-file-id/view");

  useEffect(() => {
    apiFetch("/resume/view").then((res) => {
      if (res?.success && res?.data?.resumeUrl) {
        setResumeUrl(res.data.resumeUrl);
      }
    });
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-teal-50/60 to-transparent dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 dark:bg-slate-800 border border-teal-100 dark:border-slate-700 flex items-center justify-center mb-6">
            <FileText size={28} className="text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
            My Resume
          </p>
          <h1
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Curriculum Vitae
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Sweta Pandey · Full Stack Developer & Educator
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 bg-teal-600 dark:bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors shadow-md"
            >
              <ExternalLink size={16} />
              View Resume
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 border-2 border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300 font-semibold rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Embed Box */}
      <section className="py-12 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-50 dark:bg-slate-800/80 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-700">
            <div className="bg-gray-200 dark:bg-slate-800 px-5 py-3 flex items-center gap-2 border-b border-gray-300 dark:border-slate-700">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-teal-400" />
              <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">Sweta_Pandey_Resume.pdf</span>
            </div>
            <div className="flex items-center justify-center h-80 px-8">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-50 dark:bg-slate-700 flex items-center justify-center">
                  <FileText size={32} className="text-teal-600 dark:text-teal-400" />
                </div>
                <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Resume Access</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                  Click below to open the complete document in a new browser tab.
                </p>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-semibold text-sm rounded-xl hover:bg-teal-700 transition-colors shadow-xs"
                >
                  <ExternalLink size={14} /> Open Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
