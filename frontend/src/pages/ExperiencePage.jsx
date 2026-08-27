import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, MapPin, Calendar } from "lucide-react";
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

export default function ExperiencePage() {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useSection();

  useEffect(() => {
    apiFetch("/experience/").then((res) => {
      setLoading(false);
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setExperienceList(res.data);
      } else {
        // Default fallback items
        setExperienceList([
          {
            _id: "1",
            title: "Personal Tutor",
            organization: "Edushala, Bhopal",
            type: "work",
            description: "Teaching Mathematics, Science, English, Hindi, EVS, and GK to Nursery-to-Class-6 students using storytelling, visual aids, and interactive methods.",
            location: "Bhopal, MP",
            current: true,
          },
          {
            _id: "2",
            title: "B.Tech in Computer Science & Engineering",
            organization: "Lakshmi Narain College of Technology (LNCT)",
            type: "education",
            description: "Focusing on software development, Data Structures, OOP, DBMS, and Web Technologies.",
            location: "Bhopal, MP",
            current: true,
          },
          {
            _id: "3",
            title: "Diploma in Computer Science & Engineering",
            organization: "Patel College of Science & Technology (PCST)",
            type: "education",
            description: "Covered core computer fundamentals, programming in C, Python, and web design basics.",
            location: "Bhopal, MP",
            current: false,
          },
        ]);
      }
    });
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-teal-50/60 to-transparent dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm tracking-widest uppercase mb-2">
            Career & Academic Background
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Experience & Education 💼
          </h1>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={sectionRef} className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              Loading experience timeline...
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-teal-200 dark:border-teal-800 flex flex-col gap-10">
              {experienceList.map((item) => (
                <div key={item._id || item.title} className="fade-up relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-600 dark:bg-teal-400 border-2 border-white dark:border-slate-900 ring-2 ring-teal-200 dark:ring-teal-900" />
                  <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700/60 shadow-sm">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === "work" ? (
                            <Briefcase size={18} className="text-teal-600 dark:text-teal-400" />
                          ) : (
                            <GraduationCap size={18} className="text-teal-600 dark:text-teal-400" />
                          )}
                          <h3
                            className="font-bold text-gray-900 dark:text-white text-base"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                          {item.organization}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {item.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <MapPin size={12} /> {item.location}
                          </div>
                        )}
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            item.current
                              ? "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                              : "bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                          }`}
                        >
                          {item.current ? "Ongoing / Active" : "Completed"}
                        </span>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
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
