import { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSEO } from "../utils/useSEO";

const posts = [
  {
    id: 1,
    title: "Getting Started with Python File Automation",
    excerpt: "How I automated my downloads folder with 30 lines of Python — and what it taught me about system modules.",
    date: "July 2025",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=340&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "What Teaching Nursery Kids Taught Me About Code",
    excerpt: "Patience, clarity, repetition. The best lessons in communication I've had came from a five-year-old asking 'why?'.",
    date: "June 2025",
    category: "Teaching",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=340&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Understanding REST APIs Without the Jargon",
    excerpt: "A beginner-friendly breakdown of how web applications exchange data — no CS degree required to follow along.",
    date: "May 2025",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format",
  },
];

const categories = ["All", "Tech", "Teaching", "Personal"];

export default function Blog() {
  useSEO({
    title: "Thoughts & Tech Blogs",
    description: "Read articles and insights written by Sweta Pandey on Python automation, teaching methods, and software engineering.",
    keywords: "Sweta Pandey Blog, Python Automation Blog, Tech Education Articles",
    canonical: "https://swetapandey.dev/blog"
  });

  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <article className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-xs tracking-widest uppercase mb-2">
            Ideas & Reflections
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Thoughts & Learnings
          </h1>
        </div>
      </section>

      {/* Filter */}
      <nav aria-label="Blog Categories" className="py-6 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                active === cat
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Grid */}
      <section className="py-16 bg-gray-50/50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/60 dark:border-slate-800/60 shadow-xs overflow-hidden flex flex-col hover:border-teal-500 transition-all hover:-translate-y-1"
              >
                <div className="relative h-44 bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-slate-900 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-slate-700">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 mb-3">
                    <Calendar size={12} />
                    <time>{post.date}</time>
                  </div>
                  <h2
                    className="font-bold text-gray-900 dark:text-white text-base mb-2 leading-snug"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-5">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                    Read Article <ArrowRight size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
