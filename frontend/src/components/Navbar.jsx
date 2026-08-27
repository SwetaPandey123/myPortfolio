import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/#skills" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Hobbies", to: "/hobbies" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { themeMode, activeTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const handleHashLink = (to) => {
    if (to.startsWith("/#")) {
      if (location.pathname !== "/") {
        window.location.href = to;
      } else {
        const id = to.replace("/#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-xs border-b border-gray-200/50 dark:border-slate-800/50"
          : "bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-gray-100/30 dark:border-slate-800/30"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-bold text-xl tracking-tight text-teal-600 dark:text-teal-400 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
          Sweta Pandey
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) =>
            to.startsWith("/#") ? (
              <button
                key={label}
                onClick={() => handleHashLink(to)}
                className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {label}
              </button>
            ) : (
              <Link
                key={label}
                to={to}
                className={`text-xs font-semibold transition-colors ${
                  location.pathname === to
                    ? "text-teal-600 dark:text-teal-400 font-bold border-b-2 border-teal-500 pb-0.5"
                    : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                {label}
              </Link>
            )
          )}

          {/* Theme Preference Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-100/60 dark:bg-slate-800/60 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-slate-700 transition-all text-xs font-semibold"
            aria-label="Toggle Theme"
            title={`Mode: ${themeMode.toUpperCase()} (Click to change)`}
          >
            {themeMode === "light" && <Sun size={14} className="text-amber-500" />}
            {themeMode === "dark" && <Moon size={14} className="text-teal-400" />}
            {themeMode === "system" && <Monitor size={14} className="text-indigo-400" />}
            <span className="capitalize text-[11px]">{themeMode}</span>
          </button>

          {/* Resume Button */}
          <Link
            to="/resume"
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 dark:bg-teal-500 text-white text-xs font-bold rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all shadow-xs"
          >
            <FileText size={14} />
            Resume
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 text-xs flex items-center gap-1"
          >
            {activeTheme === "light" ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-teal-400" />}
          </button>
          <button
            className="text-gray-700 dark:text-gray-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-gray-200 dark:border-slate-800 shadow-xl px-6 py-6">
          <nav className="flex flex-col gap-3">
            {navLinks.map(({ label, to }) =>
              to.startsWith("/#") ? (
                <button
                  key={label}
                  onClick={() => handleHashLink(to)}
                  className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 py-1"
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  to={to}
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 py-1"
                >
                  {label}
                </Link>
              )
            )}
            <Link
              to="/resume"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs"
            >
              <FileText size={16} /> Resume
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
