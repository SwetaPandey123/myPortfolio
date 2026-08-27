import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Bug, RefreshCw, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function NotFound() {
  const [score, setScore] = useState(0);
  const [bugPosition, setBugPosition] = useState({ top: "50%", left: "50%" });

  const moveBug = () => {
    const randomTop = Math.floor(Math.random() * 70 + 15) + "%";
    const randomLeft = Math.floor(Math.random() * 70 + 15) + "%";
    setBugPosition({ top: randomTop, left: randomLeft });
  };

  const catchBug = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore % 5 === 0) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    moveBug();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white px-6 relative overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg z-10 glass-card p-10 rounded-3xl border border-slate-800 shadow-2xl relative"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-8xl font-black text-teal-400 tracking-tighter mb-2"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          404
        </motion.div>

        <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-amber-400" size={20} /> Lost In Code Space
        </h1>
        
        <p className="text-slate-400 text-xs leading-relaxed mb-6">
          The page you requested was refactored out of existence. While you're here, test your developer reflexes by catching the 404 Bug!
        </p>

        {/* Mini Bug Catcher Game */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 relative h-48 mb-8 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1"><Trophy size={14} className="text-amber-400" /> Score: {score}</span>
            <button
              onClick={() => { setScore(0); moveBug(); }}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>

          {/* Target Bug */}
          <motion.button
            onClick={catchBug}
            animate={{ top: bugPosition.top, left: bugPosition.left }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute p-3 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 rounded-full border border-rose-500/40 shadow-lg cursor-pointer transition-transform hover:scale-125"
            style={{ top: bugPosition.top, left: bugPosition.left }}
            title="Click to Catch Bug!"
          >
            <Bug size={20} />
          </motion.button>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-teal-400 transition-all shadow-lg"
        >
          <Home size={16} /> Return To Home
        </Link>
      </motion.div>
    </div>
  );
}
