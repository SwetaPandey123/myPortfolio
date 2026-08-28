import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchResume, fetchSkills, fetchExperience } from '@/utils/api';
import Link from 'next/link';
import AboutProfileCard from '@/components/AboutProfileCard';

export const metadata = {
  title: 'About Me | Sweta Pandey B.Tech CSE Student & Full Stack Developer',
  description: 'Learn about Sweta Pandey, a B.Tech Computer Science student at LNCT Bhopal specializing in MERN Stack, Python automation, and PWC Certified Cyber Security.',
  alternates: {
    canonical: 'https://sweta-portfolio.vercel.app/about',
  },
};

export const revalidate = 60;

export default async function AboutPage() {
  let resumeUrl = '';
  let skills = [];
  let experience = [];

  try {
    const [resRes, skRes, expRes] = await Promise.allSettled([
      fetchResume(),
      fetchSkills(),
      fetchExperience()
    ]);

    if (resRes.status === 'fulfilled' && resRes.value?.data) {
      resumeUrl = resRes.value.data.resumeURL || resRes.value.data.resumeUrl || '';
    }
    if (skRes.status === 'fulfilled' && skRes.value?.data) {
      skills = skRes.value.data;
    }
    if (expRes.status === 'fulfilled' && expRes.value?.data) {
      experience = expRes.value.data;
    }
  } catch (err) {
    console.warn('About page data fetch error:', err.message);
  }

  const defaultTechStack = [
    { Name: "React.js", category: "Frontend", icon: "ri-reactjs-fill" },
    { Name: "Next.js", category: "Frontend", icon: "ri-nextjs-fill" },
    { Name: "JavaScript (ES6+)", category: "Frontend", icon: "ri-javascript-fill" },
    { Name: "Python", category: "Backend & Database", icon: "ri-command-line" },
    { Name: "Node.js", category: "Backend & Database", icon: "ri-nodejs-fill" },
    { Name: "MongoDB", category: "Backend & Database", icon: "ri-database-2-fill" },
    { Name: "C Programming", category: "Core CS & Tools", icon: "ri-code-s-slash-line" },
    { Name: "Git & GitHub", category: "Core CS & Tools", icon: "ri-git-branch-fill" }
  ];

  const techList = skills.length > 0 ? skills.slice(0, 12) : defaultTechStack;

  return (
    <main className="min-h-screen bg-slate-50/60 pt-28 pb-16">
      <Navbar resumeUrl={resumeUrl} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold tracking-wide uppercase">
            <i className="ri-user-smile-line text-sm"></i>
            <span>About Sweta Pandey</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Passionate <span className="text-gradient">Full Stack Developer</span> & Computer Scientist
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            B.Tech Computer Science Engineering student at LNCT Bhopal with expertise in MERN Stack, Python automation, and Cyber Security.
          </p>
        </div>

        {/* Profile & Background Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column Profile Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center">
            <div className="space-y-4">
              <AboutProfileCard />

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Sweta Pandey</h2>
                <p className="text-xs text-indigo-600 font-bold tracking-wide uppercase mt-1">
                  Full Stack Web Developer
                </p>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  LNCT Bhopal • Native: West Bengal
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-left text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Education Degree:</span>
                <span className="font-bold text-slate-900">B.Tech CSE (2023–2026)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">College:</span>
                <span className="font-bold text-indigo-600">LNCT Bhopal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Prior Diploma:</span>
                <span className="font-bold text-slate-900">PCST Bhopal (2020–2023)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Certification:</span>
                <span className="font-bold text-emerald-600">PWC Cyber Security (2025)</span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex justify-center gap-2 pt-2">
              <a
                href="https://www.linkedin.com/in/sweta-pandey-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 flex items-center justify-center text-xl transition-all shadow-2xs hover:scale-105"
                title="LinkedIn"
              >
                <i className="ri-linkedin-fill"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center text-xl transition-all shadow-2xs hover:scale-105"
                title="GitHub"
              >
                <i className="ri-github-fill"></i>
              </a>
              <a
                href="https://www.instagram.com/_sweta__pandey?igsi=MWdpazM2cXNocTNqaQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-700 flex items-center justify-center text-xl transition-all shadow-2xs hover:scale-105"
                title="Instagram"
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a
                href="mailto:pandeysweta612@gmail.com"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 flex items-center justify-center text-xl transition-all shadow-2xs hover:scale-105"
                title="Email"
              >
                <i className="ri-mail-line"></i>
              </a>
            </div>
          </div>

          {/* Right Column Detailed Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">Engineering Philosophy & Journey</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                I am currently pursuing my <strong>Bachelor of Technology (B.Tech) in Computer Science Engineering</strong> at <strong>Lakshmi Narain College of Technology (LNCT), Bhopal</strong>. My technical journey started with a <strong>Diploma in Computer Science Engineering</strong> at Patel College of Science & Technology (PCST).
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                My engineering focus revolves around crafting high-performance full-stack web applications with <strong>React.js, Next.js, Node.js, Express, and MongoDB</strong>, as well as Python automation scripts. I prioritize clean code principles, REST API contracts, and security compliance.
              </p>
            </div>

            {/* Core Competencies Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
                  <i className="ri-code-s-slash-line"></i>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Full Stack Engineering</h3>
                <p className="text-xs text-slate-500">React.js, Next.js, Node.js, Express, MongoDB, REST APIs.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 text-xl font-bold">
                  <i className="ri-terminal-box-line"></i>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Python & Automation</h3>
                <p className="text-xs text-slate-500">File organizers, web scrapers, data processing, REST clients.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-bold">
                  <i className="ri-shield-check-line"></i>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Cyber Security Certified</h3>
                <p className="text-xs text-slate-500">PWC 2025 Cyber Security Certification holder.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 text-xl font-bold">
                  <i className="ri-translate-2"></i>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Multilingual Communication</h3>
                <p className="text-xs text-slate-500">Fluent in Hindi (Native), English, and Bengali.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid Section on About Page */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="px-3.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-full border border-indigo-100">
                Core Stack
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Technologies & Tools I Work With
              </h2>
            </div>
            <Link
              href="/#skills"
              className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:underline"
            >
              <span>View Full Tech Stack</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techList.map((item) => (
              <div
                key={item._id || item.Name}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-2 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 text-2xl shadow-2xs">
                  <i className={item.icon || 'ri-code-line'}></i>
                </div>
                <h3 className="font-extrabold text-slate-900 text-xs truncate w-full">{item.Name}</h3>
                <span className="text-[10px] text-slate-500 font-semibold">{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Interested in working together?</h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Explore my projects, read my technical blogs, or drop a message directly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="px-6 py-3.5 rounded-xl btn-gradient text-white text-xs font-bold shadow-md hover:opacity-95"
            >
              Read Tech Blogs
            </Link>
            <a
              href="mailto:pandeysweta612@gmail.com"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold shadow-md"
            >
              Email Me Direct
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
