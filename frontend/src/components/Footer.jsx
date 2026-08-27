'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl shadow-md">
                SP
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Sweta Pandey
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              B.Tech CSE Student @ LNCT Bhopal & Personal Tutor @ Edushala. Full Stack Engineer specializing in Python, React, Next.js, and Node.js.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/in/sweta-pandey-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors text-lg"
                title="LinkedIn"
              >
                <i className="ri-linkedin-fill"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center text-slate-300 transition-colors text-lg"
                title="GitHub"
              >
                <i className="ri-github-fill"></i>
              </a>
              <a
                href="https://www.instagram.com/_sweta__pandey?igsi=MWdpazM2cXNocTNqaQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors text-lg"
                title="Instagram"
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a
                href="https://www.facebook.com/share/1Dfd99FRPW/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors text-lg"
                title="Facebook"
              >
                <i className="ri-facebook-fill"></i>
              </a>
              <a
                href="https://x.com/SwetaPandey612"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center text-slate-300 transition-colors text-lg"
                title="X (Twitter)"
              >
                <i className="ri-twitter-x-line"></i>
              </a>
              <a
                href="mailto:pandeysweta612@gmail.com"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors text-lg"
                title="Email Direct"
              >
                <i className="ri-mail-line"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#skills" className="hover:text-indigo-400 transition-colors">Skills & Competencies</a></li>
              <li><a href="#projects" className="hover:text-indigo-400 transition-colors">Software & Python Projects</a></li>
              <li><a href="#experience" className="hover:text-indigo-400 transition-colors">Edushala Experience & LNCT</a></li>
              <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contact Me</a></li>
            </ul>
          </div>

          {/* Contact & Server Status */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-base">Direct Contact</h4>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">

              <div className="text-slate-300 font-semibold flex items-center space-x-1.5">
                <i className="ri-mail-line text-indigo-400"></i>
                <span>pandeysweta612@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 pt-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Render Live Backend Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Sweta Pandey. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
              <i className="ri-lock-line"></i>
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
