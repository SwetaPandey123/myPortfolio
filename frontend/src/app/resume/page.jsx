import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchResume } from '@/utils/api';

export const metadata = {
  title: 'Resume & Curriculum Vitae | Sweta Pandey Full Stack Developer',
  description: 'View and download the official resume of Sweta Pandey featuring B.Tech Computer Science Engineering degree at LNCT Bhopal, Python automation projects, and MERN stack applications.',
  alternates: {
    canonical: 'https://sweta-portfolio.vercel.app/resume',
  },
};

export const revalidate = 60;

export default async function ResumePage() {
  let resumeUrl = "https://drive.google.com/file/d/13CZZdx_fuHoAYd8mAdk6JQH3ZkuD2fi4/view?usp=drive_link";

  try {
    const res = await fetchResume();
    if (res?.data && (res.data.resumeURL || res.data.resumeUrl)) {
      resumeUrl = res.data.resumeURL || res.data.resumeUrl;
    }
  } catch (err) {
    console.warn('Resume page fallback used:', err.message);
  }

  const driveEmbedUrl = resumeUrl.includes('/view')
    ? resumeUrl.replace('/view', '/preview')
    : resumeUrl;

  return (
    <main className="min-h-screen bg-slate-50/60 pt-28 pb-16">
      <Navbar resumeUrl={resumeUrl} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <i className="ri-file-pdf-2-line text-sm"></i>
            <span>Curriculum Vitae Document</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Sweta Pandey <span className="text-gradient">Resume</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Official resume containing B.Tech CSE degree, Python automation scripts, and MERN stack software projects.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl text-white font-bold btn-gradient shadow-lg hover:opacity-95 text-sm"
            >
              <i className="ri-file-download-line text-lg"></i>
              <span>Download / Open Resume (Google Drive)</span>
            </a>
          </div>
        </div>

        {/* Embedded Viewer & Resume Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column PDF Preview Box */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800">Google Drive Document Preview</span>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
              >
                <span>Full Screen</span>
                <i className="ri-external-link-line"></i>
              </a>
            </div>

            {/* Iframe Document Container with Loading Fallback */}
            <div className="relative w-full h-[620px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
              <iframe
                src={driveEmbedUrl}
                className="w-full h-full border-0 relative z-10"
                title="Sweta Pandey Resume PDF"
                allow="autoplay"
              ></iframe>

              {/* Fallback overlay if browser blocks drive iframe */}
              <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-50">
                <i className="ri-file-text-line text-5xl text-indigo-400"></i>
                <p className="text-slate-700 font-bold text-base">Sweta Pandey Official Resume</p>
                <p className="text-xs text-slate-500 max-w-sm">
                  If the PDF preview is taking long to load or blocked by browser permissions, click below to open directly in Google Drive.
                </p>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 transition-colors"
                >
                  Open in Google Drive
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Structured Resume Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Education Record</span>
                <i className="ri-graduation-cap-line text-indigo-600 text-lg"></i>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-extrabold text-slate-900 text-sm">B.Tech - Computer Science</h4>
                  <p className="text-indigo-600 font-semibold">LNCT Bhopal (2023 – 2026)</p>
                  <p className="text-slate-500 mt-1">Data Structures, OOP, DBMS, Computer Networks, Operating Systems</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-extrabold text-slate-900 text-sm">Diploma - Computer Science</h4>
                  <p className="text-indigo-600 font-semibold">PCST Bhopal (2020 – 2023)</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-extrabold text-slate-900 text-sm">Class 10th Secondary</h4>
                  <p className="text-indigo-600 font-semibold">Holy Garden Model Public School (2017 – 2018)</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-3">
              <h3 className="text-sm font-extrabold text-indigo-400 uppercase tracking-wider">
                Certifications & Core Stack
              </h3>
              <p className="text-xs text-slate-300 font-semibold">
                🔒 <strong>Cyber Security</strong> – Certified by PWC (PricewaterhouseCoopers) 2025
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Python', 'C Prog', 'HTML/CSS', 'JavaScript', 'React.js', 'Next.js', 'Node.js', 'Express', 'MongoDB'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
