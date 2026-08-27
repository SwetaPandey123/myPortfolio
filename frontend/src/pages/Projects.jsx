import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "../components/icons";
import { apiFetch } from "../utils/api";
import { useSEO } from "../utils/useSEO";

const filters = ["All", "Python", "Web", "API", "Automation"];

export default function Projects() {
  useSEO({
    title: "Projects Portfolio",
    description: "Explore software projects created by Sweta Pandey — Python automation, Weather REST API app, Web Scraper, and React applications.",
    keywords: "Sweta Pandey Projects, Python Projects, React Portfolio Projects, Web Scraper Python",
    canonical: "https://swetapandey.dev/projects"
  });

  const [activeFilter, setActiveFilter] = useState("All");
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/project/all").then((res) => {
      setLoading(false);
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setProjectsList(res.data);
      } else {
        setProjectsList([
          {
            _id: "1",
            title: "Python File Organizer",
            descriptions: "An automation script that sorts cluttered directory files into clean sub-folders by extension.",
            techStack: ["Python", "os", "shutil"],
            gitHub: "https://github.com/SwetaPandey123",
          },
          {
            _id: "2",
            title: "Weather Information App",
            descriptions: "A real-time weather metrics application built with Python fetching forecast data from a public REST API.",
            techStack: ["Python", "REST API", "requests"],
            gitHub: "https://github.com/SwetaPandey123",
          },
          {
            _id: "3",
            title: "Web Scraper",
            descriptions: "A data collection pipeline parsing web page contents into structured datasets using BeautifulSoup.",
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
    <article className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-teal-50/70 via-transparent to-transparent dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-xs tracking-widest uppercase mb-2">
            Software Portfolio
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            All Projects & Builds
          </h1>
        </div>
      </section>

      {/* Filter Bar */}
      <nav aria-label="Project Categories" className="py-6 bg-white dark:bg-slate-900 border-b border-gray-200/60 dark:border-slate-800/60 sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === f
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </nav>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50/50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-xs font-semibold">
              Loading projects...
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((p) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={p._id || p.title}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-gray-200/60 dark:border-slate-800/60 shadow-xs flex flex-col justify-between hover:border-teal-500 transition-all hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(p.techStack || []).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-semibold px-2.5 py-1 bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-300 rounded-md"
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
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {p.descriptions || p.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 border-t border-gray-100 dark:border-slate-800 pt-4">
                      {p.gitHub && (
                        <a
                          href={p.gitHub}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          <GithubIcon size={15} /> GitHub Code <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </article>
  );
}
