import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, Sun, Moon } from "lucide-react";
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
  const { theme, toggleTheme } = useTheme();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-800"
            : "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-bold text-xl tracking-tight text-teal-600 dark:text-teal-400"
        >
          Sweta Pandey
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) =>
            to.startsWith("/#") ? (
              <button
                key={label}
                onClick={() => handleHashLink(to)}
                className="nav-link text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {label}
              </button>
            ) : (
              <Link
                key={label}
                to={to}
                className={`nav-link text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? "text-teal-600 dark:text-teal-400 font-semibold active"
                    : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                {label}
              </Link>
            )
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle Theme"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
          </button>

          {/* Resume Link */}
          <Link
            to="/resume"
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 dark:bg-teal-500 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all shadow-sm"
          >
            <FileText size={15} />
            Resume
          </Link>
        </nav>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
          </button>
          <button
            className="text-gray-700 dark:text-gray-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-lg px-6 py-5">
          <nav className="flex flex-col gap-3">
            {navLinks.map(({ label, to }) =>
              to.startsWith("/#") ? (
                <button
                  key={label}
                  onClick={() => handleHashLink(to)}
                  className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 py-1"
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  to={to}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 py-1"
                >
                  {label}
                </Link>
              )
            )}
            <Link
              to="/resume"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white font-semibold rounded-xl text-sm"
            >
              <FileText size={16} /> Resume
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
