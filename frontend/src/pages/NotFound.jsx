import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50/40 via-white to-gray-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6">
      <div className="text-center max-w-md">
        <div
          className="text-8xl md:text-9xl font-bold text-teal-600 dark:text-teal-400 leading-none mb-4 animate-bounce select-none"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          404
        </div>
        <h1
          className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 bg-teal-600 dark:bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-md text-sm"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
