import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ExperiencePage from "./pages/ExperiencePage";
import Hobbies from "./pages/Hobbies";
import Blog from "./pages/Blog";
import Resume from "./pages/Resume";
import Login from "./pages/Login";
import OtpVerify from "./pages/OtpVerify";
import AdminEdit from "./pages/AdminEdit";
import NotFound from "./pages/NotFound";

function MainLayout() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/edit" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/admin";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/resume" element={<Resume />} />

          {/* Admin Routes */}
          <Route path="/edit" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/admin" element={<AdminEdit />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}