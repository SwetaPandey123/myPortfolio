import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
  Code2,
  Database,
  Network,
  Monitor,
  BookOpen,
  Users,
  Heart,
  Send,
  Sparkles,
  CheckCircle2,
  Terminal,
  Cpu
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/icons";
import { apiFetch } from "../utils/api";
import { useSEO } from "../utils/useSEO";

function useSection() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".fade-up").forEach((child, i) => {
            setTimeout(() => {
              child.classList.add("visible");
            }, i * 70);
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  useSEO({
    title: "Home",
    description: "Official Portfolio of Sweta Pandey — B.Tech CSE student at LNCT Bhopal, Full Stack Developer, and Personal Tutor at Edushala. Exploring software development, Python, React, and Accessible Education.",
    keywords: "Sweta Pandey, Sweta Pandey Portfolio, Sweta Pandey LNCT, LNCT Bhopal, Edushala Tutor, Python Developer",
    canonical: "https://swetapandey.dev/"
  });

  const heroRef = useRef(null);
  const techRef = useSection();
  const skillsRef = useSection();
  const projectsRef = useSection();
  const contactRef = useSection();

  const [dbProjects, setDbProjects] = useState([]);
  const [dbSkills, setDbSkills] = useState([]);
  const [techCategory, setTechCategory] = useState("All");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const items = heroRef.current?.querySelectorAll(".fade-up");
    items?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 120 + i * 100);
    });

    apiFetch("/project/all").then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setDbProjects(res.data);
      }
    });

    apiFetch("/skills/all").then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setDbSkills(res.data);
      }
    });
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const res = await apiFetch("/message/send", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    setLoading(false);
    if (res?.success) {
      setStatusMsg({ type: "success", text: "Message sent successfully! Sweta will get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatusMsg({ type: "error", text: res?.message || "Failed to send message. Please try again." });
    }
  };

  const techStackList = [
    { name: "Python", category: "Languages", iconClass: "devicon-python-plain colored" },
    { name: "C Language", category: "Languages", iconClass: "devicon-c-plain colored" },
    { name: "React.js", category: "Web & Backend", iconClass: "devicon-react-original colored" },
    { name: "Node.js", category: "Web & Backend", iconClass: "devicon-nodejs-plain colored" },
    { name: "Express.js", category: "Web & Backend", iconClass: "devicon-express-original dark:text-white" },
    { name: "MongoDB", category: "Web & Backend", iconClass: "devicon-mongodb-plain colored" },
    { name: "HTML5", category: "Web & Backend", iconClass: "devicon-html5-plain colored" },
    { name: "CSS3", category: "Web & Backend", iconClass: "devicon-css3-plain colored" },
    { name: "Git", category: "Tools", iconClass: "devicon-git-plain colored" },
    { name: "GitHub", category: "Tools", iconClass: "devicon-github-original dark:text-white" },
    { name: "VS Code", category: "Tools", iconClass: "devicon-vscode-plain colored" },
  ];

  const filteredTech =
    techCategory === "All"
      ? techStackList
      : techStackList.filter((t) => t.category === techCategory);

  return (
    <article className="min-h-screen">
      {/* HERO SECTION */}
      <section
        aria-label="Introduction Hero"
        className="min-h-screen flex items-center pt-24 pb-16 bg-gradient-to-br from-teal-50/70 via-white to-gray-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div
            ref={heroRef}
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
          >
            {/* Text Content */}
            <header className="flex-1 max-w-xl">
              {/* Availability Badge */}
              <div className="fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Available for Projects & Developer Roles
              </div>

              <h1
                className="fade-up text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Hi, I'm <span className="text-teal-600 dark:text-teal-400">Sweta Pandey</span>{" "}
                <span className="inline-block animate-bounce">👋</span>
              </h1>
              
              <h2 className="fade-up text-lg md:text-xl text-teal-700 dark:text-teal-400 font-semibold mb-4 flex items-center gap-2">
                <Sparkles size={18} /> B.Tech CSE Student · Aspiring Developer · Personal Tutor
              </h2>

              <p className="fade-up text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
                I build thoughtful, clean software solutions and empower curious young learners. Bridging solid programming fundamentals and engaging classroom teaching — one project and one lesson at a time.
              </p>

              <div className="fade-up flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3.5 bg-teal-600 dark:bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all shadow-md text-sm"
                >
                  Explore Projects <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-2 px-6 py-3.5 border-2 border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300 font-semibold rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800 transition-all text-sm"
                >
                  Get In Touch
                </button>
              </div>
            </header>

            {/* Profile Avatar Frame */}
            <figure className="flex-shrink-0 fade-up relative">
              <div className="relative">
                {/* Ambient Glow */}
                <div className="absolute inset-0 rounded-full bg-teal-400 dark:bg-teal-500 blur-3xl opacity-30 scale-125 animate-glow" />
                
                {/* Main Avatar Circle */}
                <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=500&fit=crop&auto=format"
                    alt="Sweta Pandey Portfolio Headshot"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Tech Badges around Avatar */}
                <div className="absolute -top-2 -left-2 bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                  <i className="devicon-python-plain colored text-xl" /> Python
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                  <i className="devicon-react-original colored text-xl" /> React.js
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* TECH STACK PRESENTATION SECTION */}
      <section
        ref={techRef}
        aria-label="Technologies & Tools"
        className="py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="fade-up text-center mb-10">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Tech Stack & Toolkit
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Technologies I Work With 💻
            </h2>
          </div>

          {/* Tech Filter Categories */}
          <div className="fade-up flex flex-wrap gap-2 justify-center mb-10">
            {["All", "Languages", "Web & Backend", "Tools"].map((cat) => (
              <button
                key={cat}
                onClick={() => setTechCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  techCategory === cat
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredTech.map((item) => (
              <div
                key={item.name}
                className="fade-up card-lift flex flex-col items-center justify-center p-5 bg-gray-50 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-xs"
              >
                <i className={`${item.iconClass} text-4xl mb-3`} aria-hidden="true" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        ref={skillsRef}
        aria-label="Skills & Expertise"
        className="py-24 bg-gray-50/50 dark:bg-slate-950"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Capabilities
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Skills & Expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="fade-up bg-white dark:bg-slate-900 rounded-2xl p-7 border border-teal-100 dark:border-slate-800 shadow-sm">
              <h3
                className="font-semibold text-gray-900 dark:text-white text-lg mb-5 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Terminal size={18} className="text-teal-600 dark:text-teal-400" /> Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {dbSkills.length > 0
                  ? dbSkills.map((s) => (
                      <span
                        key={s._id || s.name}
                        className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg shadow-xs"
                      >
                        {s.name || s.Name} ({s.proficiency})
                      </span>
                    ))
                  : ["Python", "C Language", "HTML5", "CSS3", "Git", "GitHub", "VS Code"].map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg shadow-xs"
                      >
                        {s}
                      </span>
                    ))}
              </div>
            </div>

            {/* Core CS Knowledge */}
            <div className="fade-up bg-white dark:bg-slate-900 rounded-2xl p-7 border border-indigo-100 dark:border-slate-800 shadow-sm">
              <h3
                className="font-semibold text-gray-900 dark:text-white text-lg mb-5 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Cpu size={18} className="text-indigo-600 dark:text-indigo-400" /> Core CS Fundamentals
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Object-Oriented Programming (OOP)", icon: <Code2 size={16} /> },
                  { label: "Database Management Systems (DBMS)", icon: <Database size={16} /> },
                  { label: "Computer Networks & Protocols", icon: <Network size={16} /> },
                  { label: "Operating Systems Fundamentals", icon: <Monitor size={16} /> },
                ].map(({ label, icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching & Communication */}
            <div className="fade-up bg-white dark:bg-slate-900 rounded-2xl p-7 border border-amber-100 dark:border-slate-800 shadow-sm">
              <h3
                className="font-semibold text-gray-900 dark:text-white text-lg mb-5 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <BookOpen size={18} className="text-amber-600 dark:text-amber-400" /> Teaching & Soft Skills
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Trilingual: Hindi / English / Bengali", icon: <Users size={16} /> },
                  { label: "Student Engagement & Classroom Guidance", icon: <BookOpen size={16} /> },
                  { label: "Empathy, Patience & Storytelling", icon: <Heart size={16} /> },
                ].map(({ label, icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-amber-600 dark:text-amber-400">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section
        id="projects"
        ref={projectsRef}
        aria-label="Featured Projects"
        className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Portfolio Portfolio Showcase
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Featured Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {dbProjects.length > 0
              ? dbProjects.slice(0, 3).map((p) => (
                  <article
                    key={p._id || p.title}
                    className="fade-up card-lift bg-gray-50 dark:bg-slate-800/60 rounded-2xl p-7 border border-gray-100 dark:border-slate-700/60 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(p.techStack || []).map((t) => (
                          <span
                            key={t}
                            className="text-xs font-semibold px-2.5 py-1 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3
                        className="font-bold text-gray-900 dark:text-white text-lg mb-3"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                        {p.descriptions || p.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {p.gitHub && (
                        <a
                          href={p.gitHub}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          <GithubIcon size={16} /> GitHub Source <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </article>
                ))
              : [
                  {
                    title: "Python File Organizer",
                    tech: ["Python", "os", "shutil"],
                    desc: "An automation tool that intelligently sorts files in any target directory into categorized sub-folders by file type.",
                    github: "https://github.com/SwetaPandey123",
                  },
                  {
                    title: "Weather Information App",
                    tech: ["Python", "REST API"],
                    desc: "A weather application fetching real-time weather metrics, temperature, and forecasts from a public weather REST API.",
                    github: "https://github.com/SwetaPandey123",
                  },
                  {
                    title: "Web Scraper Tool",
                    tech: ["Python", "BeautifulSoup"],
                    desc: "A data extraction pipeline that crawls websites and parses structured HTML content into usable datasets.",
                    github: "https://github.com/SwetaPandey123",
                  },
                ].map((p) => (
                  <article
                    key={p.title}
                    className="fade-up card-lift bg-gray-50 dark:bg-slate-800/60 rounded-2xl p-7 border border-gray-100 dark:border-slate-700/60 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-semibold px-2.5 py-1 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3
                        className="font-bold text-gray-900 dark:text-white text-lg mb-3"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                        {p.desc}
                      </p>
                    </div>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      <GithubIcon size={16} /> GitHub Source <ExternalLink size={12} />
                    </a>
                  </article>
                ))}
          </div>

          <div className="fade-up text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-semibold rounded-xl hover:bg-teal-600 hover:text-white transition-all text-sm"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        ref={contactRef}
        aria-label="Contact Section"
        className="py-24 bg-gray-50/50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Let's Connect
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Contact Me
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="fade-up flex flex-col gap-4">
              {statusMsg && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
                    statusMsg.type === "success"
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                  }`}
                >
                  <CheckCircle2 size={16} /> {statusMsg.text}
                </div>
              )}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Sweta, I'd like to discuss a project..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 dark:bg-teal-500 text-white font-semibold text-sm rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors shadow-sm disabled:opacity-50"
              >
                <Send size={16} /> {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>

            {/* Info Cards */}
            <div className="fade-up flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">Email Address</p>
                  <a
                    href="mailto:pandeysweta612@gmail.com"
                    className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    pandeysweta612@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">Location</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Bhopal, Madhya Pradesh, India</p>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-slate-800 pt-6 flex gap-4">
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
                <a
                  href="https://github.com/SwetaPandey123"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
                >
                  <GithubIcon size={16} /> GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
