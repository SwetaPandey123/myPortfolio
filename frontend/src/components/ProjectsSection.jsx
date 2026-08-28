'use client';

import { useState } from 'react';

export default function ProjectsSection({ projects = [] }) {
  const [filter, setFilter] = useState('All');

  // Merged projects list from both Developer & Academic resumes
  const defaultProjects = [
    {
      _id: '1',
      title: 'Full Stack Portfolio Showcase',
      descriptions: 'A full-stack portfolio built with Next.js, Node.js, Express, MongoDB, and animated with Three.js & GSAP. Includes admin portal and email alerts.',
      techStack: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Three.js'],
      imageURL: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      liveLINK: 'https://sweta-portfolio.vercel.app',
      gitHub: 'https://github.com/sweta/portfolio',
      featured: true,
    },
    {
      _id: '2',
      title: 'Python File Organizer',
      descriptions: 'Developed a Python automation tool that automatically organizes desktop/workspace files into categorized folders based on file extensions using os and shutil modules.',
      techStack: ['Python', 'Automation', 'OS Module', 'Shutil'],
      imageURL: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      liveLINK: 'https://github.com',
      gitHub: 'https://github.com',
      featured: true,
    },
    {
      _id: '3',
      title: 'Weather Information App',
      descriptions: 'Built a Python application retrieving real-time weather data for any global city via REST API integration, HTTP requests, and structured JSON parsing.',
      techStack: ['Python', 'REST API', 'Requests', 'JSON Parsing'],
      imageURL: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80',
      liveLINK: 'https://github.com',
      gitHub: 'https://github.com',
      featured: false,
    },
    {
      _id: '4',
      title: 'Web Scraper & Data Extractor',
      descriptions: 'Developed an automated web scraping tool to extract structured web data efficiently using Python Requests and BeautifulSoup libraries.',
      techStack: ['Python', 'BeautifulSoup', 'Requests', 'Data Parsing'],
      imageURL: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
      liveLINK: 'https://github.com',
      gitHub: 'https://github.com',
      featured: false,
    }
  ];

  const projectList = projects.length > 0 ? projects : defaultProjects;

  const filterOptions = ['All', 'Featured'];

  const hasFeatured = projectList.some((p) => p.featured);

  // Sort: featured first, then rest — only when showing All
  const sortedList = filter === 'All' && hasFeatured
    ? [...projectList].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    : projectList;

  const filteredProjects =
    filter === 'Featured'
      ? projectList.filter((p) => p.featured)
      : sortedList;

  return (
    <section id="projects" className="py-24 relative bg-slate-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wide uppercase">
              <i className="ri-folder-code-line text-sm"></i>
              <span>Portfolio Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Software & Automation <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Explore software applications, Python automation tools, REST API integrations, and web scraping utilities I've engineered.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm self-start md:self-auto">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === opt
                    ? 'gradient-bg text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-slate-200/80 bg-white flex flex-col group"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={
                    project.imageURL ||
                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {project.featured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-slate-900 text-[10px] font-extrabold rounded-full shadow-md flex items-center space-x-1">
                    <i className="ri-star-fill text-[10px]"></i>
                    <span>FEATURED</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                    {project.descriptions || project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {Array.isArray(project.techStack)
                    ? project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {tech}
                        </span>
                      ))
                    : typeof project.techStack === 'string'
                    ? project.techStack.split(',').map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {tech.trim()}
                        </span>
                      ))
                    : null}
                </div>

                {/* Card Action Links */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  {project.liveLINK ? (
                    <a
                      href={project.liveLINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <span>Live Demo</span>
                      <i className="ri-arrow-right-up-line text-sm"></i>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">Demo available</span>
                  )}

                  {project.gitHub && (
                    <a
                      href={project.gitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                      title="GitHub Code Repository"
                    >
                      <i className="ri-github-line text-base"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
