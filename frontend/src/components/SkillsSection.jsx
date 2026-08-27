'use client';

import { useState } from 'react';

export default function SkillsSection({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const defaultTechStack = [
    { _id: '1', Name: "React.js", category: "Frontend", icon: "ri-reactjs-fill" },
    { _id: '2', Name: "Next.js", category: "Frontend", icon: "ri-nextjs-fill" },
    { _id: '3', Name: "JavaScript (ES6+)", category: "Frontend", icon: "ri-javascript-fill" },
    { _id: '4', Name: "HTML5", category: "Frontend", icon: "ri-html5-fill" },
    { _id: '5', Name: "CSS3", category: "Frontend", icon: "ri-css3-fill" },
    { _id: '6', Name: "Node.js", category: "Backend & Database", icon: "ri-nodejs-fill" },
    { _id: '7', Name: "Express.js", category: "Backend & Database", icon: "ri-server-fill" },
    { _id: '8', Name: "MongoDB", category: "Backend & Database", icon: "ri-database-2-fill" },
    { _id: '9', Name: "Python", category: "Backend & Database", icon: "ri-command-line" },
    { _id: '10', Name: "C Programming", category: "Core CS & Tools", icon: "ri-code-s-slash-line" },
    { _id: '11', Name: "Data Structures & OOP", category: "Core CS & Tools", icon: "ri-cpu-fill" },
    { _id: '12', Name: "DBMS & SQL", category: "Backend & Database", icon: "ri-table-fill" },
    { _id: '13', Name: "Computer Networks", category: "Core CS & Tools", icon: "ri-global-fill" },
    { _id: '14', Name: "Operating Systems", category: "Core CS & Tools", icon: "ri-terminal-window-fill" },
    { _id: '15', Name: "Git & GitHub", category: "Core CS & Tools", icon: "ri-git-branch-fill" },
    { _id: '16', Name: "VS Code", category: "Core CS & Tools", icon: "ri-code-box-fill" },
    { _id: '17', Name: "Cyber Security (PWC Certified)", category: "Core CS & Tools", icon: "ri-shield-check-fill" }
  ];

  const techList = skills.length > 0 ? skills : defaultTechStack;

  const categories = ['All', 'Frontend', 'Backend & Database', 'Core CS & Tools'];

  const filteredTech = techList.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="skills" className="py-24 relative bg-slate-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <i className="ri-stack-line text-sm"></i>
            <span>Engineering Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Technologies, frameworks, databases, and core computer science tools I work with.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeCategory === cat
                  ? 'btn-gradient text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pure Tech Stack Grid (No Percentages) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredTech.map((item) => (
            <div
              key={item._id || item.Name}
              className="pro-card pro-card-hover p-5 rounded-3xl bg-white flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer border border-slate-200/80"
            >
              {/* Tech Real Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-indigo-50/80 border border-indigo-100/80 flex items-center justify-center text-indigo-600 text-3xl group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                <i className={item.icon || 'ri-code-line'}></i>
              </div>

              {/* Tech Name & Category Tag */}
              <div className="space-y-1 w-full">
                <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {item.Name}
                </h3>
                <span className="text-[11px] font-bold text-slate-500 block truncate">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
