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
  Sparkles
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/icons";
import { apiFetch } from "../utils/api";

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
            }, i * 80);
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
  const heroRef = useRef(null);
  const skillsRef = useSection();
  const projectsRef = useSection();
  const contactRef = useSection();

  const [dbProjects, setDbProjects] = useState([]);
  const [dbSkills, setDbSkills] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Hero animation entrance
    const items = heroRef.current?.querySelectorAll(".fade-up");
    items?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 150 + i * 120);
    });

    // Fetch projects from backend
    apiFetch("/project/all").then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setDbProjects(res.data);
      }
    });

    // Fetch skills from backend
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
      setStatusMsg({ type: "success", text: "Message sent successfully! Thank you for reaching out." });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatusMsg({ type: "error", text: res?.message || "Failed to send message. Please try again." });
    }
  };

  // Tech Stack Items (Devicon style)
  const techStackList = [
    { name: "Python", iconClass: "devicon-python-plain colored" },
    { name: "C Language", iconClass: "devicon-c-plain colored" },
    { name: "React.js", iconClass: "devicon-react-original colored" },
    { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
    { name: "Express.js", iconClass: "devicon-express-original dark:text-white" },
    { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
    { name: "HTML5", iconClass: "devicon-html5-plain colored" },
    { name: "CSS3", iconClass: "devicon-css3-plain colored" },
    { name: "Git", iconClass: "devicon-git-plain colored" },
    { name: "GitHub", iconClass: "devicon-github-original dark:text-white" },
    { name: "VS Code", iconClass: "devicon-vscode-plain colored" },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center pt-24 pb-16 bg-gradient-to-br from-teal-50/60 via-transparent to-transparent dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div
            ref={heroRef}
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
          >
            {/* Text */}
            <div className="flex-1 max-w-xl">
              <p className="fade-up text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                <Sparkles size={16} /> Welcome to my portfolio
              </p>
              <h1
                className="fade-up text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Hi, I'm Sweta Pandey{" "}
                <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="fade-up text-teal-700 dark:text-teal-400 font-semibold text-lg mb-4">
                B.Tech CSE Student · Aspiring Developer · Personal Tutor
              </p>
              <p className="fade-up text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
                I build thoughtful software products and nurture curious young minds.
                Bridging clean code and classroom learning — one project and one lesson at a time.
              </p>
              <div className="fade-up flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3 bg-teal-600 dark:bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all shadow-md"
                >
                  View Projects <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-2 px-6 py-3 border-2 border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-400 font-semibold rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800 transition-all"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Photo Avatar */}
            <div className="flex-shrink-0 fade-up">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-teal-300 dark:bg-teal-600 blur-2xl opacity-40 scale-110 animate-glow" />
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&auto=format"
                    alt="Sweta Pandey"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK PRESENTATION SECTION (PRASHANT JHA STYLE) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Technologies & Tools
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              My Tech Stack 💻
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStackList.map((item) => (
              <div
                key={item.name}
                className="card-lift flex flex-col items-center justify-center p-5 bg-gray-50 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm"
              >
                <i className={`${item.iconClass} text-4xl mb-3`}></i>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" ref={skillsRef} className="py-24 bg-gray-50/50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              What I Bring
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
                className="font-semibold text-gray-900 dark:text-white text-lg mb-5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                🛠 Technical Skills
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
                  : ["Python", "C Programming", "HTML5", "CSS3", "Git", "GitHub", "VS Code"].map((s) => (
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
                className="font-semibold text-gray-900 dark:text-white text-lg mb-5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                📚 Core CS Fundamentals
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "OOP Concepts", icon: <Code2 size={16} /> },
                  { label: "Database Management (DBMS)", icon: <Database size={16} /> },
                  { label: "Computer Networks", icon: <Network size={16} /> },
                  { label: "Operating Systems", icon: <Monitor size={16} /> },
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

            {/* Teaching & Soft Skills */}
            <div className="fade-up bg-white dark:bg-slate-900 rounded-2xl p-7 border border-amber-100 dark:border-slate-800 shadow-sm">
              <h3
                className="font-semibold text-gray-900 dark:text-white text-lg mb-5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                🎓 Teaching & Communication
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Languages: Hindi / English / Bengali", icon: <Users size={16} /> },
                  { label: "Classroom & Student Engagement", icon: <BookOpen size={16} /> },
                  { label: "Patience, Empathy & Storytelling", icon: <Heart size={16} /> },
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
      <section id="projects" ref={projectsRef} className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              What I've Built
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
                  <div
                    key={p._id || p.title}
                    className="fade-up card-lift bg-gray-50 dark:bg-slate-800/60 rounded-2xl p-7 border border-gray-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between"
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
                          <GithubIcon size={16} /> GitHub <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              : [
                  {
                    title: "Python File Organizer",
                    tech: ["Python", "os", "shutil"],
                    desc: "An automation tool that intelligently sorts files in a directory into categorized sub-folders by extension.",
                    github: "https://github.com/SwetaPandey123",
                  },
                  {
                    title: "Weather Information App",
                    tech: ["Python", "REST API"],
                    desc: "A weather application that fetches real-time data from a public weather API for cities worldwide.",
                    github: "https://github.com/SwetaPandey123",
                  },
                  {
                    title: "Web Scraper Tool",
                    tech: ["Python", "BeautifulSoup"],
                    desc: "A data extraction tool that crawls web pages and parses structured content into clean datasets.",
                    github: "https://github.com/SwetaPandey123",
                  },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="fade-up card-lift bg-gray-50 dark:bg-slate-800/60 rounded-2xl p-7 border border-gray-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between"
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
                      <GithubIcon size={16} /> GitHub <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
          </div>

          <div className="fade-up text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-semibold rounded-xl hover:bg-teal-600 hover:text-white transition-all"
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
        className="py-24 bg-gray-50/50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Get In Touch
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Contact Me
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <form onSubmit={handleContactSubmit} className="fade-up flex flex-col gap-4">
              {statusMsg && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium ${
                    statusMsg.type === "success"
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                  }`}
                >
                  {statusMsg.text}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me what's on your mind..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 dark:bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors shadow-sm disabled:opacity-50"
              >
                <Send size={16} /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Info Cards */}
            <div className="fade-up flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">Email</p>
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
                <a
                  href="https://github.com/SwetaPandey123"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-slate-800 text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
