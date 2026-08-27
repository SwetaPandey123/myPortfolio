'use client';

import { useState } from 'react';

export default function BlogClientComponent({ initialBlogs = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  const categories = ['All', 'Full Stack', '3D & Motion', 'Security', 'Technology'];

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesCategory =
      activeCategory === 'All' ||
      blog.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'btn-gradient text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <i className="ri-search-line absolute left-3.5 top-3 text-slate-400 text-base"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-indigo-600 text-xs font-medium text-slate-900"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 space-y-2">
          <i className="ri-article-line text-4xl text-slate-300 block"></i>
          <p className="font-bold text-base text-slate-800">No blog articles found</p>
          <p className="text-xs">Try adjusting your category filter or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => setSelectedBlog(blog)}
              className="pro-card pro-card-hover rounded-3xl overflow-hidden bg-white flex flex-col cursor-pointer group"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={
                    blog.imageURL ||
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-700 text-xs font-bold rounded-full border border-slate-200 shadow-2xs">
                  {blog.category || 'Technology'}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold">
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{blog.readTime || '5 min read'}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                    {blog.excerpt || blog.content?.substring(0, 140) + '...'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600">
                    <span>Read Full Article</span>
                    <i className="ri-arrow-right-line text-sm"></i>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator.share({ title: blog.title, text: blog.excerpt, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Article link copied to clipboard!');
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 flex items-center justify-center transition-colors"
                    title="Share Article"
                  >
                    <i className="ri-share-line text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                {selectedBlog.category}
              </span>
              <button
                onClick={() => setSelectedBlog(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xl"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {selectedBlog.title}
            </h2>

            <div className="flex items-center space-x-3 text-xs text-slate-500 font-semibold">
              <span>Author: {selectedBlog.author || 'Sweta Pandey'}</span>
              <span>•</span>
              <span>Published: {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{selectedBlog.readTime || '5 min read'}</span>
            </div>

            {selectedBlog.imageURL && (
              <img
                src={selectedBlog.imageURL}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-2xl border border-slate-200"
              />
            )}

            <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal space-y-4">
              {selectedBlog.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-medium">Written by Sweta Pandey</span>
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
