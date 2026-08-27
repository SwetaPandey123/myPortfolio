'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ resumeUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only 4 links — clean minimal nav
  const navLinks = [
    { name: 'Home',   href: '/' },
    { name: 'About',  href: '/about' },
    { name: 'Blog',   href: '/blog' },
    { name: 'Resume', href: '/resume' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 border ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-lg shadow-slate-900/5'
            : 'bg-white/90 backdrop-blur-md border-slate-200/70 shadow-sm'
        }`}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            SP
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm tracking-tight text-slate-900 block leading-tight">
              Sweta Pandey
            </span>
            <span className="text-[10px] text-indigo-600 font-bold tracking-wider uppercase block">
              Full Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                isActive(link.href)
                  ? 'text-indigo-600 bg-indigo-50 font-bold'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Download Resume + Admin icon */}
        <div className="hidden md:flex items-center gap-2">
          {resumeUrl ? (
            <a
              href={resumeUrl.replace('/upload/', '/upload/fl_attachment/')}
              download="Sweta_Pandey_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all shadow-sm"
            >
              <i className="ri-download-2-line text-sm"></i>
              Resume
            </a>
          ) : (
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all shadow-sm"
            >
              <i className="ri-file-user-line text-sm"></i>
              Resume
            </Link>
          )}
          <Link
            href="/admin"
            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Admin"
          >
            <i className="ri-user-settings-line text-lg"></i>
          </Link>
        </div>

        {/* Mobile: Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/admin" className="p-2 text-slate-500 hover:text-indigo-600 rounded-lg">
            <i className="ri-user-settings-line text-xl"></i>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className={mobileMenuOpen ? 'ri-close-line text-2xl' : 'ri-menu-3-line text-2xl'}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 space-y-1 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                isActive(link.href)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
            >
              <i className="ri-download-2-line"></i>
              Download Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
