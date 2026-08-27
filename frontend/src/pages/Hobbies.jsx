import { useEffect, useRef } from "react";
import {
  BookOpen,
  Star,
  Lightbulb,
  Globe,
  Puzzle,
  Heart,
  Users,
  Palette,
} from "lucide-react";
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

const hobbyTiles = [
  { icon: <BookOpen size={22} />, label: "Reading", caption: "Sci-fi, tech articles, and personal development books" },
  { icon: <Globe size={22} />, label: "Languages", caption: "Hindi · English · Bengali — connecting across cultures" },
  { icon: <Puzzle size={22} />, label: "Puzzles & Logic", caption: "Riddles, logic puzzles, and Sudoku for mental agility" },
  { icon: <Palette size={22} />, label: "Creative Arts", caption: "Visual note-taking, sketching ideas, and creative design" },
  { icon: <Star size={22} />, label: "Astronomy", caption: "Stargazing and learning about planetary sciences" },
  { icon: <Lightbulb size={22} />, label: "Problem Solving", caption: "Exploring algorithm challenges and logical puzzles" },
];

export default function Hobbies() {
  useSEO({
    title: "Beyond Code & Hobbies",
    description: "Interests and life beyond coding — Personal Tutor at Edushala Bhopal, reading, languages, and creative problem solving.",
    keywords: "Sweta Pandey Hobbies, Edushala Bhopal Personal Tutor, Education",
    canonical: "https://swetapandey.dev/hobbies"
  });

  const teachRef = useSection();
  const hobbiesRef = useSection();

  return (
    <article className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-amber-50/60 to-transparent dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-xs tracking-widest uppercase mb-2">
            Life Beyond The Screen
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Beyond Code 🌱
          </h1>
        </div>
      </section>

      {/* Teaching Feature Card */}
      <section ref={teachRef} className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="fade-up bg-gradient-to-br from-teal-700 to-teal-800 dark:from-teal-800 dark:to-slate-900 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-xl">
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <span className="text-teal-200 text-xs font-semibold uppercase tracking-widest">
                  Featured · Teaching & Mentorship
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Personal Tutor at Edushala, Bhopal
              </h2>
              <p className="text-teal-200 text-xs font-semibold mb-6">1+ Year Experience (Nursery to Class 6)</p>
              <p className="text-white/90 text-xs md:text-sm leading-relaxed max-w-2xl mb-8">
                Teaching Mathematics, Science, English, Hindi, EVS, and General Knowledge to young learners. Using storytelling, interactive visual aids, and lesson plans that ignite curiosity and confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <BookOpen size={16} />, label: "Storytelling" },
                  { icon: <Heart size={16} />, label: "Patience & Empathy" },
                  { icon: <Lightbulb size={16} />, label: "Creative Teaching" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-xl text-xs font-semibold"
                  >
                    {icon}
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobby Tiles */}
      <section ref={hobbiesRef} className="py-20 bg-gray-50/50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="fade-up text-center mb-14">
            <h2
              className="text-2xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Other Interests & Passions
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {hobbyTiles.map(({ icon, label, caption }) => (
              <div
                key={label}
                className="fade-up card-lift bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-xs text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4">
                  {icon}
                </div>
                <h3
                  className="font-bold text-gray-900 dark:text-white text-sm mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
