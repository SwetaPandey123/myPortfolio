import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/icons";
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
            setTimeout(() => child.classList.add("visible"), i * 80);
          });
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const filters = ["All", "Python", "Web", "API", "Automation"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useSection();

  useEffect(() => {
    apiFetch("/project/all").then((res) => {
      setLoading(false);
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setProjectsList(res.data);
      } else {
        // Fallback default projects if DB is empty
        setProjectsList([
          {
            _id: "1",
            title: "Python File Organizer",
            descriptions: "An automation tool that intelligently sorts files in a directory into categorized sub-folders by file type — boosting workflow efficiency.",
            techStack: ["Python", "os", "shutil"],
            gitHub: "https://github.com/SwetaPandey123",
          },
          {
            _id: "2",
            title: "Weather Information App",
            descriptions: "A real-time weather application that fetches temperature, conditions, and forecasts from a public weather REST API.",
            techStack: ["Python", "REST API", "requests"],
            gitHub: "https://github.com/SwetaPandey123",
          },
          {
            _id: "3",
            title: "Web Scraper",
            descriptions: "A configurable data extraction tool that crawls web pages and parses structured content into clean datasets.",
            techStack: ["Python", "BeautifulSoup", "Requests"],
            gitHub: "https://github.com/SwetaPandey123",
          },
        ]);
      }
    });
  }, []);

  const filtered =
    activeFilter === "All"
      ? projectsList
      : projectsList.filter((p) =>
          (p.techStack || []).some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-teal-50/60 to-transparent dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
            What I've Built
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            All Projects
          </h1>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-6 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridRef} className="py-16 bg-gray-50/50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              Loading projects from backend...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div
                  key={p._id || p.title}
                  className="fade-up card-lift bg-white dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(p.techStack || []).map((t) => (
                        <span
                          key={t}
                          className="text-xs font-semibold px-2.5 py-1 bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-300 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2
                      className="font-bold text-gray-900 dark:text-white text-lg mb-3"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {p.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {p.descriptions || p.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-gray-100 dark:border-slate-800 pt-4">
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
                    {p.liveLINK && (
                      <a
                        href={p.liveLINK}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        Live Demo <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
