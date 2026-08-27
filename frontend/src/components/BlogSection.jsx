'use client';

import { useState } from 'react';

export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: 'Building Scalable Full-Stack Apps with Next.js & Express',
      excerpt: 'Learn architectural best practices, API authentication, and state management when combining Next.js with a Node.js Express backend.',
      category: 'Full Stack',
      readTime: '5 min read',
      date: 'Aug 24, 2026',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      content: `Developing modern full-stack web applications requires a clean separation of concerns, robust API contracts, and reliable state management. 
      In this article, we explore how combining Next.js for server-side rendering and static optimization with an Express & MongoDB backend provides ultimate flexibility.
      Key takeaways include JWT session management, CORS policies, environment variable isolation, and automated database indexes.`
    },
    {
      id: 2,
      title: 'Mastering GSAP & Three.js for Interactive Web Experiences',
      excerpt: 'How to integrate 3D WebGL particle canvases with smooth scroll libraries like Lenis without compromising mobile performance.',
      category: '3D & Motion',
      readTime: '7 min read',
      date: 'Aug 18, 2026',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      content: `Visual delight and micro-animations significantly elevate user retention. 
      By pairing Three.js buffer geometries with GSAP ScrollTrigger and Lenis smooth scrolling, developers can create immersive 3D WebGL landscapes. 
      We dive deep into frame loop optimizations, device pixel ratio scaling, and mobile fallback strategies.`
    },
    {
      id: 3,
      title: 'Securing REST APIs with OTP Verification & JWT Authentication',
      excerpt: 'A comprehensive step-by-step guide to setting up double-factor OTP email verification using Nodemailer and JWT tokens.',
      category: 'Security',
      readTime: '6 min read',
      date: 'Aug 10, 2026',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      content: `Security is paramount for admin dashboards and user portals. 
      Using One-Time Password (OTP) verification delivered directly via email ensures administrative actions remain protected against brute force attacks.
      We cover Nodemailer transport configuration, expiring OTP tokens in memory, and issuing signed JWTs.`
    }
  ];

  return (
    <section id="blog" className="py-24 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <i className="ri-article-line text-sm"></i>
            <span>Knowledge Sharing & Insights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest Articles & <span className="gradient-text">Blogs</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Thoughts, tutorials, and deep dives into modern web development, engineering, and user experience.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-slate-200/80 bg-white flex flex-col group cursor-pointer"
              onClick={() => setActiveBlog(blog)}
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-700 text-xs font-bold rounded-full border border-slate-200">
                  {blog.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center space-x-1 text-sm font-bold text-indigo-600">
                    <span>Read Article</span>
                    <i className="ri-arrow-right-line text-base"></i>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator.share({ title: blog.title, text: blog.excerpt, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 flex items-center justify-center transition-colors"
                    title="Share Article"
                  >
                    <i className="ri-share-line text-base"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                {activeBlog.category}
              </span>
              <button
                onClick={() => setActiveBlog(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xl"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {activeBlog.title}
            </h2>

            <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
              <span>Published: {activeBlog.date}</span>
              <span>•</span>
              <span>{activeBlog.readTime}</span>
            </div>

            <img
              src={activeBlog.image}
              alt={activeBlog.title}
              className="w-full h-56 object-cover rounded-2xl"
            />

            <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
              {activeBlog.content}
            </p>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-medium">Written by Sweta Pandey</span>
              <button
                onClick={() => setActiveBlog(null)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
