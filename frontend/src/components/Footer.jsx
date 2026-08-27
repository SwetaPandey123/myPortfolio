import { Link } from "react-router-dom";
import { Mail, Edit3 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Sweta Pandey. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/SwetaPandey123"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="mailto:pandeysweta612@gmail.com"
              className="hover:text-teal-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
          <Link
            to="/edit"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-400 transition-colors"
          >
            <Edit3 size={13} />
            Admin Edit Mode
          </Link>
        </div>
      </div>
    </footer>
  );
}
