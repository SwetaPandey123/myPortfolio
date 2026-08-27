import { useEffect, useRef, useState } from "react";
import { Award, GraduationCap } from "lucide-react";

function useSection() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".fade-up").forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 100);
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

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl font-bold text-teal-600 dark:text-teal-400"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {count}+
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{suffix}</div>
    </div>
  );
}

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Lakshmi Narain College of Technology (LNCT), Bhopal",
    period: "2023 – 2026",
    status: "Ongoing",
  },
  {
    degree: "Diploma in Computer Science & Engineering",
    institution: "Patel College of Science & Technology (PCST), Bhopal",
    period: "2020 – 2023",
    status: "Completed",
  },
  {
    degree: "Class 10th High School",
    institution: "Holy Garden Model Public School",
    period: "2017 – 2018",
    status: "Completed",
  },
];

export default function About() {
  const bioRef = useSection();
  const eduRef = useSection();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-teal-50/60 to-transparent dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
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

      {/* Bio section */}
      <section ref={bioRef} className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="fade-up">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop&auto=format"
                  alt="Sweta Pandey"
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
              </div>
            </div>
            <div className="fade-up">
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sweta Pandey
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                I'm a final-year B.Tech Computer Science student at Lakshmi Narain College of Technology (LNCT), Bhopal. I am passionate about building purposeful software applications and making education accessible and enjoyable.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                My journey spans both software engineering and education. As a personal tutor at Edushala, Bhopal (1+ year experience), I help nursery-to-Class-6 students discover the joy of learning through storytelling, visual aids, and interactive methods.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
                I am fluent in Hindi, English, and Bengali — allowing me to connect with students, colleagues, and collaborators across diverse backgrounds.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Hindi", "English", "Bengali"].map((lang) => (
                  <span
                    key={lang}
                    className="px-3.5 py-1.5 bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-sm font-semibold rounded-lg border border-teal-100 dark:border-slate-700"
                  >
                    🗣️ {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-16 bg-gray-50 dark:bg-slate-950 border-y border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            <AnimatedCounter target={12} suffix="Months Teaching" />
            <AnimatedCounter target={5} suffix="Projects Built" />
            <AnimatedCounter target={3} suffix="Languages Spoken" />
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section ref={eduRef} className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="fade-up text-center mb-14">
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Academic Journey
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Education Timeline
            </h2>
          </div>
          <div className="relative pl-6 border-l-2 border-teal-200 dark:border-teal-800 flex flex-col gap-10">
            {education.map((edu, i) => (
              <div key={i} className="fade-up relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-600 dark:bg-teal-400 border-2 border-white dark:border-slate-900 ring-2 ring-teal-200 dark:ring-teal-900" />
                <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700/60 shadow-sm">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{edu.period}</p>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          edu.status === "Ongoing"
                            ? "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                            : "bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Banner */}
      <section className="py-12 bg-gradient-to-r from-teal-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
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
              <p className="text-teal-200 text-sm">2025 Certificate</p>
            </div>
          </div>
          <span className="px-5 py-2.5 bg-white text-teal-800 font-bold rounded-xl text-sm shadow">
            🏆 Certified
          </span>
        </div>
      </section>
    </div>
  );
}
