'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), { ssr: false });

export default function HeroSection({ resumeUrl }) {
  const roles = [
    'Full Stack Web Developer',
    'B.Tech CSE Student @ LNCT Bhopal',
    'Python & MERN Specialist',
    'Cyber Security Certified (PWC)'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && displayedText === targetText) {
      typingSpeed = 2200;
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText !== targetText) {
          setDisplayedText(targetText.substring(0, displayedText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(targetText.substring(0, displayedText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50/70 overflow-hidden">
      {/* Three.js canvas dynamically loaded client-side only */}
      <ThreeCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Clear Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-extrabold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span>Available for Full-Stack & Engineering Roles</span>
            </span>

            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
              <i className="ri-global-line text-indigo-600"></i>
              <span>Hindi • English • Bengali</span>
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Hi, I'm <span className="text-gradient">Sweta Pandey</span>
            </h1>
            <p className="text-2xl sm:text-4xl font-bold text-slate-800 tracking-tight h-[44px]">
              <span className="text-indigo-600">{displayedText}</span>
              <span className="animate-pulse text-slate-400">|</span>
            </p>
          </div>

          {/* Bio Description */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            B.Tech Computer Science student at <strong className="text-slate-900 font-semibold">Lakshmi Narain College of Technology (LNCT), Bhopal</strong>. Skilled in Python, C, React, Next.js, Node.js, Express, MongoDB, REST APIs, and Cyber Security.
          </p>

          {/* Contact Details Pill Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 pt-1">
            <span className="flex items-center space-x-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
              <i className="ri-map-pin-line text-indigo-600 text-sm"></i>
              <span>Bhopal, MP, India</span>
            </span>


            <a href="mailto:pandeysweta612@gmail.com" className="flex items-center space-x-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs hover:text-indigo-600 transition-colors">
              <i className="ri-mail-line text-indigo-600 text-sm"></i>
              <span>pandeysweta612@gmail.com</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#projects"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold btn-gradient transition-all shadow-md hover:-translate-y-0.5"
            >
              <span>View Projects</span>
              <i className="ri-arrow-right-line text-base"></i>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-2xs hover:-translate-y-0.5"
            >
              <span>Get in Touch</span>
              <i className="ri-mail-send-line text-base text-indigo-600"></i>
            </a>

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all shadow-2xs hover:-translate-y-0.5"
              >
                <span>Download Resume</span>
                <i className="ri-file-download-line text-base"></i>
              </a>
            )}
          </div>

          {/* Stat Badges */}
          <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 text-left shadow-2xs">
              <span className="block text-2xl font-extrabold text-indigo-600">4+</span>
              <span className="text-xs text-slate-500 font-semibold">Core Projects</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 text-left shadow-2xs">
              <span className="block text-2xl font-extrabold text-sky-600">B.Tech CSE</span>
              <span className="text-xs text-slate-500 font-semibold">LNCT Bhopal</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 text-left shadow-2xs">
              <span className="block text-2xl font-extrabold text-purple-600">PWC 2025</span>
              <span className="text-xs text-slate-500 font-semibold">Cyber Certified</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Contrast Showcase Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 rounded-3xl btn-gradient blur-xl opacity-25"></div>

            <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center">
              {/* Profile Photo */}
              <div className="relative w-32 h-32 mx-auto rounded-2xl p-1 btn-gradient shadow-lg">
                <img
                  src="https://res.cloudinary.com/akphv6j6/image/upload/v1787869354/61476690723.png"
                  alt="Sweta Pandey"
                  className="w-full h-full rounded-xl object-cover object-top bg-slate-100"
                />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Sweta Pandey</h3>
                <p className="text-xs text-indigo-600 font-bold tracking-wide uppercase mt-1">
                  Full Stack Web Developer
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  B.Tech CSE (2023 - 2026) • LNCT Bhopal
                </p>
              </div>

              {/* Floating Tech Badges */}
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {['React.js', 'Python', 'Node.js', 'MongoDB', 'Next.js', 'C Prog'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/80">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Connect With Me</p>
                <div className="flex justify-center gap-2">
                  <a
                    href="https://www.linkedin.com/in/sweta-pandey-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 flex items-center justify-center transition-all text-lg shadow-2xs hover:scale-105"
                    title="LinkedIn"
                  >
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center transition-all text-lg shadow-2xs hover:scale-105"
                    title="GitHub"
                  >
                    <i className="ri-github-fill"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/_sweta__pandey?igsi=MWdpazM2cXNocTNqaQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-700 flex items-center justify-center transition-all text-lg shadow-2xs hover:scale-105"
                    title="Instagram"
                  >
                    <i className="ri-instagram-line"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1Dfd99FRPW/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-all text-lg shadow-2xs hover:scale-105"
                    title="Facebook"
                  >
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a
                    href="https://x.com/SwetaPandey612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center transition-all text-lg shadow-2xs hover:scale-105"
                    title="X (Twitter)"
                  >
                    <i className="ri-twitter-x-line"></i>
                  </a>
                  <a
                    href="mailto:pandeysweta612@gmail.com"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 flex items-center justify-center transition-all text-lg shadow-2xs hover:scale-105"
                    title="Email Direct"
                  >
                    <i className="ri-mail-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
