'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar({ resumeUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/#skills', sectionId: 'skills' },
    { name: 'Projects', href: '/#projects', sectionId: 'projects' },
    { name: 'Experience', href: '/#experience', sectionId: 'experience' },
    { name: 'Blog', href: '/blog' },
    { name: 'Resume', href: '/resume' },
    { name: 'Contact', href: '/#contact', sectionId: 'contact' },
  ];

  const handleNavClick = (e, link) => {
    if (link.sectionId && pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(link.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 border ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-lg shadow-slate-900/5'
            : 'bg-white/90 backdrop-blur-md border-slate-200/80 shadow-sm'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            SP
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
              Sweta Pandey
            </span>
            <span className="text-[11px] text-indigo-600 font-bold tracking-wider uppercase block">
              Full Stack Web Developer
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`px-3.5 py-2 text-xs lg:text-sm font-bold rounded-xl transition-all ${
                pathname === link.href
                  ? 'text-indigo-600 bg-indigo-50/80 font-extrabold'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/resume"
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all shadow-2xs"
          >
            <i className="ri-file-download-line text-sm"></i>
            <span>Resume</span>
          </Link>

          <Link
            href="/admin"
            className="inline-flex items-center justify-center w-9 h-9 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Admin Dashboard"
          >
            <i className="ri-user-settings-line text-lg"></i>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <Link
            href="/admin"
            className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg"
            title="Admin Portal"
          >
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
        <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="block px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
