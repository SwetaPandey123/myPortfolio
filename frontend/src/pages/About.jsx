import { useEffect, useState } from "react";
import { Award, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useSEO } from "../utils/useSEO";
import ThreeCanvas from "../components/ThreeCanvas";

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, target / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div
        className="text-4xl md:text-5xl font-extrabold text-teal-600 dark:text-teal-400"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {count}+
      </div>
      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">{suffix}</div>
    </div>
  );
}

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Lakshmi Narain College of Technology (LNCT), Bhopal",
    period: "2023 – 2026",
    status: "Ongoing",
    highlights: ["Data Structures & Algorithms, Software Architecture, OOP, DBMS & Web Development."]
  },
  {
    degree: "Diploma in Computer Science & Engineering",
    institution: "Patel College of Science & Technology (PCST), Bhopal",
    period: "2020 – 2023",
    status: "Completed",
    highlights: ["Programming in C, Python fundamentals, Operating Systems & Computer Networking."]
  },
  {
    degree: "Class 10th High School",
    institution: "Holy Garden Model Public School",
    period: "2017 – 2018",
    status: "Completed",
    highlights: ["Solid analytical foundation in Mathematics and Science."]
  },
];

export default function About() {
  useSEO({
    title: "About Me",
    description: "Learn more about Sweta Pandey — final year B.Tech Computer Science student at LNCT Bhopal, Personal Tutor at Edushala, and Developer.",
    keywords: "Sweta Pandey About, LNCT Bhopal CSE, Edushala Bhopal Tutor",
    canonical: "https://swetapandey.dev/about"
  });

  return (
    <article className="min-h-screen relative pt-20">
      {/* 3D Advance WebGL Canvas */}
      <ThreeCanvas variant="knot" />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-teal-50/70 via-transparent to-transparent dark:from-slate-900/90 dark:to-slate-950/90 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-xs tracking-widest uppercase mb-2">
            Get To Know Me
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            About Me
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md relative z-10 border-b border-gray-200/50 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.figure
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 dark:border-slate-800/60">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop&auto=format"
                  alt="Sweta Pandey"
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 to-transparent" />
              </div>
            </motion.figure>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sweta Pandey
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                I am a final-year B.Tech Computer Science student at Lakshmi Narain College of Technology (LNCT), Bhopal. I am passionate about building clean software tools and making technology accessible to everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                Alongside software engineering, I have spent over a year as a Personal Tutor at Edushala, Bhopal, mentoring nursery-to-Class-6 students. I teach Mathematics, Science, English, Hindi, and EVS through interactive storytelling.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-6">
                I am fluent in <strong>Hindi, English, and Bengali</strong>, enabling seamless communication across diverse backgrounds.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Hindi (Native)", "English (Fluent)", "Bengali (Fluent)"].map((lang) => (
                  <span
                    key={lang}
                    className="px-3.5 py-1.5 bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-semibold rounded-xl border border-teal-100 dark:border-slate-700"
                  >
                    🗣️ {lang}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-16 bg-gray-50/60 dark:bg-slate-950/60 backdrop-blur-md relative z-10 border-b border-gray-200/50 dark:border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            <AnimatedCounter target={12} suffix="Months Teaching" />
            <AnimatedCounter target={5} suffix="Projects Built" />
            <AnimatedCounter target={3} suffix="Languages Spoken" />
          </div>
        </div>
      </section>

      {/* Academic Timeline */}
      <section className="py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-xs tracking-widest uppercase mb-2">
              Academic Background
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Education History
            </h2>
          </div>

          <div className="relative pl-6 border-l-2 border-teal-200 dark:border-teal-800 flex flex-col gap-10">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-600 dark:bg-teal-400 border-2 border-white dark:border-slate-900 ring-2 ring-teal-200 dark:ring-teal-900" />
                <div className="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-gray-200/60 dark:border-slate-700/60 shadow-xs">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap size={18} className="text-teal-600 dark:text-teal-400" />
                        <h3
                          className="font-bold text-gray-900 dark:text-white text-base"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {edu.degree}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{edu.institution}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{edu.period}</p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          edu.status === "Ongoing"
                            ? "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300"
                            : "bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-gray-300"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>
                  {edu.highlights && (
                    <ul className="mt-3 text-xs text-gray-600 dark:text-gray-300 list-disc list-inside gap-1 flex flex-col">
                      {edu.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Banner */}
      <section className="py-12 bg-gradient-to-r from-teal-700 to-teal-800 text-white relative z-10 shadow-md">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Award size={28} className="text-white" />
            </div>
            <div>
              <p className="text-teal-200 text-xs font-semibold uppercase tracking-wide mb-0.5">
                Verified Certification
              </p>
              <h3
                className="text-white font-bold text-xl"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Cyber Security — PwC
              </h3>
              <p className="text-teal-200 text-xs">2025 Certificate</p>
            </div>
          </div>
          <span className="px-5 py-2.5 bg-white text-teal-800 font-bold rounded-xl text-xs shadow-xs">
            🏆 Verified Certificate
          </span>
        </div>
      </section>
    </article>
  );
}
