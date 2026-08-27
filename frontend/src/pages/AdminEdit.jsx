import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, LogOut, Home, FileText, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { apiFetch, setAuthToken } from "../utils/api";

export default function AdminEdit() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [messages, setMessages] = useState([]);
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  // Form states
  const [newProject, setNewProject] = useState({ title: "", descriptions: "", techStack: "", gitHub: "", liveLINK: "" });
  const [newSkill, setNewSkill] = useState({ name: "", category: "technical", proficiency: "Intermediate" });
  const [newExperience, setNewExperience] = useState({ title: "", organization: "", type: "work", description: "", location: "" });

  const loadData = () => {
    apiFetch("/project/all").then((res) => res?.success && setProjects(res.data));
    apiFetch("/skills/all").then((res) => res?.success && setSkills(res.data));
    apiFetch("/experience/").then((res) => res?.success && setExperiences(res.data));
    apiFetch("/resume/view").then((res) => res?.success && setResumeUrl(res.data?.resumeUrl || ""));
    apiFetch("/message/all").then((res) => res?.success && setMessages(res.data || []));
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (text) => {
    setFeedbackMsg(text);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleLogout = () => {
    setAuthToken(null);
    navigate("/");
  };

  // Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...newProject,
      techStack: newProject.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await apiFetch("/project/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (res?.success) {
      showNotification("Project created successfully!");
      setNewProject({ title: "", descriptions: "", techStack: "", gitHub: "", liveLINK: "" });
      loadData();
    } else {
      showNotification(res?.message || "Failed to create project");
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const res = await apiFetch(`/project/delete/${id}`, { method: "DELETE" });
    if (res?.success) {
      showNotification("Project deleted!");
      loadData();
    }
  };

  // Add Skill
  const handleAddSkill = async (e) => {
    e.preventDefault();
    const res = await apiFetch("/skills/create", {
      method: "POST",
      body: JSON.stringify(newSkill),
    });
    if (res?.success) {
      showNotification("Skill added successfully!");
      setNewSkill({ name: "", category: "technical", proficiency: "Intermediate" });
      loadData();
    } else {
      showNotification(res?.message || "Failed to add skill");
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    const res = await apiFetch(`/skills/delete/${id}`, { method: "DELETE" });
    if (res?.success) {
      showNotification("Skill deleted!");
      loadData();
    }
  };

  // Add Experience
  const handleAddExperience = async (e) => {
    e.preventDefault();
    const res = await apiFetch("/experience/create", {
      method: "POST",
      body: JSON.stringify(newExperience),
    });
    if (res?.success) {
      showNotification("Experience added successfully!");
      setNewExperience({ title: "", organization: "", type: "work", description: "", location: "" });
      loadData();
    } else {
      showNotification(res?.message || "Failed to add experience");
    }
  };

  // Delete Experience
  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const res = await apiFetch(`/experience/delete/${id}`, { method: "DELETE" });
    if (res?.success) {
      showNotification("Experience item deleted!");
      loadData();
    }
  };

  // Update Resume
  const handleUpdateResume = async (e) => {
    e.preventDefault();
    const res = await apiFetch("/resume/update", {
      method: "PUT",
      body: JSON.stringify({ resumeUrl }),
    });
    if (res?.success) {
      showNotification("Resume URL updated successfully!");
    } else {
      showNotification(res?.message || "Failed to update resume URL");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-16">
      {/* Top Admin Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-teal-700 dark:bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} />
          <span className="font-bold text-sm">Portfolio Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Home size={14} /> Back to Website
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-teal-400 border border-teal-500 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 size={18} /> {feedbackMsg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-slate-800 pb-4 mb-8">
          {[
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "experience", label: "Experience & Education" },
            { id: "resume", label: "Resume URL" },
            { id: "messages", label: `Messages (${messages.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-800 hover:bg-teal-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === "projects" && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <Plus size={18} className="text-teal-600" /> Add New Project
              </h2>
              <form onSubmit={handleAddProject} className="flex flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Description"
                  value={newProject.descriptions}
                  onChange={(e) => setNewProject({ ...newProject, descriptions: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs resize-none"
                />
                <input
                  type="text"
                  placeholder="Tech Stack (comma separated: Python, React)"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="GitHub Repository URL"
                  value={newProject.gitHub}
                  onChange={(e) => setNewProject({ ...newProject, gitHub: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                />
                <button
                  type="submit"
                  className="mt-2 py-2.5 bg-teal-600 text-white font-semibold text-xs rounded-xl hover:bg-teal-700 transition-colors"
                >
                  Create Project
                </button>
              </form>
            </div>

            <div className="md:col-span-2 flex flex-col gap-4">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{p.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {p.descriptions || p.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(p._id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === "skills" && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <Plus size={18} className="text-teal-600" /> Add New Skill
              </h2>
              <form onSubmit={handleAddSkill} className="flex flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder="Skill Name (e.g. Python)"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                />
                <select
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="submit"
                  className="mt-2 py-2.5 bg-teal-600 text-white font-semibold text-xs rounded-xl hover:bg-teal-700 transition-colors"
                >
                  Add Skill
                </button>
              </form>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {skills.map((s) => (
                <div
                  key={s._id}
                  className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xs">{s.name || s.Name}</h3>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">
                      {s.proficiency}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(s._id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <Plus size={18} className="text-teal-600" /> Add Experience / Education
              </h2>
              <form onSubmit={handleAddExperience} className="flex flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder="Role / Degree Title"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Company / Institution"
                  value={newExperience.organization}
                  onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                />
                <select
                  value={newExperience.type}
                  onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                >
                  <option value="work">Work Experience</option>
                  <option value="education">Education</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs resize-none"
                />
                <button
                  type="submit"
                  className="mt-2 py-2.5 bg-teal-600 text-white font-semibold text-xs rounded-xl hover:bg-teal-700 transition-colors"
                >
                  Add Item
                </button>
              </form>
            </div>

            <div className="md:col-span-2 flex flex-col gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp._id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{exp.title}</h3>
                    <p className="text-xs font-semibold text-teal-600">{exp.organization}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteExperience(exp._id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RESUME URL */}
        {activeTab === "resume" && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 max-w-xl shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
              <FileText size={20} className="text-teal-600" /> Update Portfolio Resume Link
            </h2>
            <form onSubmit={handleUpdateResume} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Google Drive / Direct PDF URL
                </label>
                <input
                  type="text"
                  required
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs"
                />
              </div>
              <button
                type="submit"
                className="py-3 bg-teal-600 text-white font-semibold text-xs rounded-xl hover:bg-teal-700 transition-colors"
              >
                Save Resume Link
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: MESSAGES */}
        {activeTab === "messages" && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
              <Mail size={20} className="text-teal-600" /> Received Contact Messages
            </h2>
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 text-xs">
                No contact messages received yet.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m._id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">{m.name}</span>
                    <span className="text-xs text-teal-600 dark:text-teal-400 font-mono">{m.email}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{m.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
