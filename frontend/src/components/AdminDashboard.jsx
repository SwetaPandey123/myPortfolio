'use client';

import { useState, useEffect, useRef } from 'react';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  fetchExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  fetchResume,
  updateResume,
  fetchMessages,
  deleteMessage,
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadProfileImage,
  uploadResumePdf
} from '@/utils/api';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('projects');

  // Data states
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const [messages, setMessages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Media upload state
  const [profileImageUrl, setProfileImageUrl] = useState('https://res.cloudinary.com/akphv6j6/image/upload/v1787869354/61476690723.png');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadMsg, setUploadMsg] = useState({ type: '', text: '' });
  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // Edit Modals state
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [pRes, sRes, eRes, rRes, mRes, bRes] = await Promise.allSettled([
        fetchProjects(),
        fetchSkills(),
        fetchExperience(),
        fetchResume(),
        fetchMessages(),
        fetchBlogs()
      ]);

      if (pRes.status === 'fulfilled' && pRes.value?.data) setProjects(pRes.value.data);
      if (sRes.status === 'fulfilled' && sRes.value?.data) setSkills(sRes.value.data);
      if (eRes.status === 'fulfilled' && eRes.value?.data) setExperience(eRes.value.data);
      if (rRes.status === 'fulfilled' && rRes.value?.data) {
        setResumeUrl(rRes.value.data.resumeURL || rRes.value.data.resumeUrl || '');
      }
      if (mRes.status === 'fulfilled' && mRes.value?.data) setMessages(mRes.value.data);
      if (bRes.status === 'fulfilled' && bRes.value?.data) setBlogs(bRes.value.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, item = null) => {
    setEditType(type);
    setEditingItem(item);

    if (item) {
      setFormData({ ...item });
    } else {
      if (type === 'project') {
        setFormData({ title: '', descriptions: '', techStack: '', imageURL: '', liveLINK: '', gitHub: '', featured: false });
      } else if (type === 'skill') {
        setFormData({ Name: '', category: 'Frontend', icon: 'ri-code-line' });
      } else if (type === 'experience') {
        setFormData({ title: '', organization: '', description: '', startDate: '', endDate: '', current: false, type: 'education', location: 'Bhopal, MP' });
      } else if (type === 'blog') {
        setFormData({ title: '', content: '', excerpt: '', category: 'Technology', readTime: '5 min read', imageURL: '', author: 'Sweta Pandey' });
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editType === 'project') {
        const payload = {
          ...formData,
          techStack: typeof formData.techStack === 'string' ? formData.techStack.split(',').map(s => s.trim()) : formData.techStack
        };
        if (editingItem) {
          await updateProject(editingItem._id, payload);
        } else {
          await createProject(payload);
        }
      } else if (editType === 'skill') {
        if (editingItem) {
          await updateSkill(editingItem._id, formData);
        } else {
          await createSkill(formData);
        }
      } else if (editType === 'experience') {
        if (editingItem) {
          await updateExperience(editingItem._id, formData);
        } else {
          await createExperience(formData);
        }
      } else if (editType === 'blog') {
        if (editingItem) {
          await updateBlog(editingItem._id, formData);
        } else {
          await createBlog(formData);
        }
      }

      setEditingItem(null);
      setEditType('');
      loadAllData();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      if (type === 'project') await deleteProject(id);
      if (type === 'skill') await deleteSkill(id);
      if (type === 'experience') await deleteExperience(id);
      if (type === 'message') await deleteMessage(id);
      if (type === 'blog') await deleteBlog(id);
      loadAllData();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const handleSaveResume = async (e) => {
    e.preventDefault();
    try {
      await updateResume(resumeUrl);
      alert('Resume URL updated successfully!');
      loadAllData();
    } catch (err) {
      alert('Failed to update resume URL.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            ✓ Logged In as Admin
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Sweta Pandey Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage tech stack, projects, education records, tech blogs, and resume links.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs border border-rose-200 transition-colors flex items-center space-x-1.5"
        >
          <i className="ri-logout-box-r-line"></i>
          <span>Logout Admin</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'projects', label: 'Projects', icon: 'ri-folder-code-line', count: projects.length },
          { id: 'skills', label: 'Tech Stack', icon: 'ri-stack-line', count: skills.length },
          { id: 'blogs', label: 'Blog Posts', icon: 'ri-article-line', count: blogs.length },
          { id: 'experience', label: 'Education Records', icon: 'ri-graduation-cap-line', count: experience.length },
          { id: 'resume', label: 'Resume Link', icon: 'ri-file-pdf-line' },
          { id: 'media', label: '📸 Media Upload', icon: 'ri-upload-cloud-2-line' },
          { id: 'messages', label: 'Contact Messages', icon: 'ri-mail-line', count: messages.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'btn-gradient text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <i className={`${tab.icon} text-base`}></i>
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading && (
        <div className="py-12 text-center text-slate-500 space-y-2">
          <i className="ri-loader-4-line text-3xl animate-spin text-indigo-600"></i>
          <p className="text-xs font-semibold">Fetching latest database records...</p>
        </div>
      )}

      {/* PROJECTS TAB */}
      {!loading && activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-extrabold text-slate-900">Manage Projects ({projects.length})</h2>
            <button
              onClick={() => openModal('project')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1"
            >
              <i className="ri-add-line"></i>
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj._id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{proj.title}</h3>
                    {proj.featured && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded border border-amber-200">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => openModal('project', proj)}
                      className="p-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-xs"
                      title="Edit Project"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete('project', proj._id)}
                      className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-xs"
                      title="Delete Project"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{proj.descriptions}</p>
                <div className="flex flex-wrap gap-1">
                  {proj.techStack?.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TECH STACK TAB */}
      {!loading && activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-extrabold text-slate-900">Manage Tech Stack ({skills.length})</h2>
            <button
              onClick={() => openModal('skill')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1"
            >
              <i className="ri-add-line"></i>
              <span>Add Tech Stack Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((sk) => (
              <div key={sk._id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl font-bold">
                    <i className={sk.icon || 'ri-code-line'}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{sk.Name}</h4>
                    <span className="text-[11px] text-slate-500 font-semibold">{sk.category}</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => openModal('skill', sk)}
                    className="p-1.5 bg-slate-100 hover:text-indigo-600 rounded-lg text-xs"
                    title="Edit Tech Item"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete('skill', sk._id)}
                    className="p-1.5 bg-slate-100 hover:text-rose-600 rounded-lg text-xs"
                    title="Delete Tech Item"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOGS TAB */}
      {!loading && activeTab === 'blogs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-extrabold text-slate-900">Manage Tech Blogs ({blogs.length})</h2>
            <button
              onClick={() => openModal('blog')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1"
            >
              <i className="ri-add-line"></i>
              <span>Write New Blog Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded">
                      {blog.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base mt-1">{blog.title}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => openModal('blog', blog)}
                      className="p-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-xs"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete('blog', blog._id)}
                      className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-xs"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{blog.excerpt || blog.content}</p>
                <div className="text-[11px] text-slate-400 font-medium">
                  Author: {blog.author} • {blog.readTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE TAB */}
      {!loading && activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-extrabold text-slate-900">Manage Education ({experience.length})</h2>
            <button
              onClick={() => openModal('experience')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1"
            >
              <i className="ri-add-line"></i>
              <span>Add Education Record</span>
            </button>
          </div>

          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp._id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start justify-between shadow-2xs">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">{exp.title}</h4>
                  <p className="text-xs font-bold text-indigo-600">{exp.organization}</p>
                  <p className="text-xs text-slate-500 mt-1">{exp.description}</p>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => openModal('experience', exp)}
                    className="p-1.5 bg-slate-100 hover:text-indigo-600 rounded-lg text-xs"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete('experience', exp._id)}
                    className="p-1.5 bg-slate-100 hover:text-rose-600 rounded-lg text-xs"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESUME TAB */}
      {!loading && activeTab === 'resume' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 max-w-2xl">
          <h2 className="text-lg font-extrabold text-slate-900">Update Google Drive Resume URL</h2>
          <form onSubmit={handleSaveResume} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Google Drive Shareable Link</label>
              <input
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900"
                required
              />
            </div>
            <button type="submit" className="px-5 py-3 btn-gradient text-white text-xs font-bold rounded-xl shadow-md">
              Save Resume URL
            </button>
          </form>
        </div>
      )}

      {/* MESSAGES TAB */}
      {!loading && activeTab === 'messages' && (
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Contact Messages ({messages.length})</h2>
          {messages.length === 0 ? (
            <p className="text-xs text-slate-500">No contact messages received yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg._id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="text-xs text-indigo-600 font-semibold hover:underline">
                        {msg.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleDelete('message', msg._id)}
                      className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EDIT MODAL */}
      {editType && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {editingItem ? `Edit ${editType}` : `Create New ${editType}`}
              </h3>
              <button onClick={() => setEditType('')} className="p-1 text-slate-500 hover:text-slate-900">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
              {editType === 'project' && (
                <>
                  <div>
                    <label className="block text-slate-700 mb-1">Project Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Description</label>
                    <textarea
                      rows="3"
                      value={formData.descriptions || ''}
                      onChange={(e) => setFormData({ ...formData, descriptions: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.techStack) ? formData.techStack.join(', ') : formData.techStack || ''}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                    />
                  </div>
                </>
              )}

              {editType === 'skill' && (
                <>
                  <div>
                    <label className="block text-slate-700 mb-1">Tech Name</label>
                    <input
                      type="text"
                      value={formData.Name || ''}
                      onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category || 'Frontend'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend & Database">Backend & Database</option>
                      <option value="Core CS & Tools">Core CS & Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Remix Icon Class (e.g. ri-reactjs-fill, ri-python-fill)</label>
                    <input
                      type="text"
                      value={formData.icon || 'ri-code-line'}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    />
                  </div>
                </>
              )}

              {editType === 'blog' && (
                <>
                  <div>
                    <label className="block text-slate-700 mb-1">Blog Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category || 'Technology'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Full Content</label>
                    <textarea
                      rows="6"
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    ></textarea>
                  </div>
                </>
              )}

              {editType === 'experience' && (
                <>
                  <div>
                    <label className="block text-slate-700 mb-1">Degree Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Institution</label>
                    <input
                      type="text"
                      value={formData.organization || ''}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border text-slate-900"
                      required
                    />
                  </div>
                </>
              )}

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditType('')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 btn-gradient text-white rounded-xl shadow-md">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── MEDIA TAB ─────────────────────────── */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          {/* Status message */}
          {uploadMsg.text && (
            <div className={`p-4 rounded-2xl text-sm font-semibold flex items-center gap-2 ${
              uploadMsg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}>
              <i className={uploadMsg.type === 'success' ? 'ri-checkbox-circle-fill text-emerald-600 text-lg' : 'ri-error-warning-fill text-rose-600 text-lg'}></i>
              {uploadMsg.text}
            </div>
          )}

          {/* ── Profile Photo Upload ── */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
                <i className="ri-user-photo-line"></i>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Profile Photo</h3>
                <p className="text-slate-500 text-xs">Uploads to Cloudinary → auto-updates everywhere on site</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Preview */}
              <div className="shrink-0">
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-28 h-28 rounded-2xl object-cover object-top border-2 border-indigo-200 shadow-md"
                />
              </div>

              <div className="flex-1 space-y-3 w-full">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImage(true);
                    setUploadMsg({ type: '', text: '' });
                    try {
                      const res = await uploadProfileImage(file);
                      if (res.success) {
                        setProfileImageUrl(res.url);
                        setUploadMsg({ type: 'success', text: `✅ Profile photo uploaded! URL: ${res.url}` });
                      } else {
                        setUploadMsg({ type: 'error', text: res.message || 'Upload failed' });
                      }
                    } catch (err) {
                      setUploadMsg({ type: 'error', text: err.response?.data?.message || 'Upload failed. Try again.' });
                    } finally {
                      setUploadingImage(false);
                    }
                  }}
                />

                <button
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full py-3 rounded-2xl btn-gradient text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 hover:opacity-90 transition-all shadow-md shadow-indigo-200"
                >
                  {uploadingImage ? (
                    <><i className="ri-loader-4-line animate-spin"></i> Uploading...</>
                  ) : (
                    <><i className="ri-upload-2-line"></i> Choose & Upload Photo</>  
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center">PNG / JPG / WebP · Max 5MB</p>

                {profileImageUrl && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 break-all">
                    <span className="font-bold text-slate-700">Current URL: </span>{profileImageUrl}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Resume PDF Upload ── */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 text-xl">
                <i className="ri-file-pdf-2-line"></i>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Resume PDF</h3>
                <p className="text-slate-500 text-xs">Uploads to Cloudinary → auto-saves URL to MongoDB → live on /resume</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Current resume preview */}
              {resumeUrl && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100">
                  <i className="ri-file-pdf-2-line text-2xl text-rose-500"></i>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700">Current Resume</p>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline truncate block">
                      {resumeUrl}
                    </a>
                  </div>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50">
                    View
                  </a>
                </div>
              )}

              <input
                ref={resumeInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploadingResume(true);
                  setUploadMsg({ type: '', text: '' });
                  try {
                    const res = await uploadResumePdf(file);
                    if (res.success) {
                      setResumeUrl(res.url);
                      setUploadMsg({ type: 'success', text: `✅ Resume uploaded & saved! Now live on /resume page.` });
                    } else {
                      setUploadMsg({ type: 'error', text: res.message || 'Upload failed' });
                    }
                  } catch (err) {
                    setUploadMsg({ type: 'error', text: err.response?.data?.message || 'Upload failed. Try again.' });
                  } finally {
                    setUploadingResume(false);
                  }
                }}
              />

              <button
                onClick={() => resumeInputRef.current?.click()}
                disabled={uploadingResume}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-all shadow-md shadow-rose-200"
              >
                {uploadingResume ? (
                  <><i className="ri-loader-4-line animate-spin"></i> Uploading Resume...</>
                ) : (
                  <><i className="ri-upload-2-line"></i> Choose & Upload Resume PDF</>
                )}
              </button>

              <p className="text-xs text-slate-400 text-center">PDF only · Max 10MB · Auto-saved to database</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
