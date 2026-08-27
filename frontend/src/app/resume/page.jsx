import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeViewer from '@/components/ResumeViewer';
import { fetchResume } from '@/utils/api';

export const metadata = {
  title: 'Resume | Sweta Pandey Full Stack Developer',
  description: 'View and download the official resume of Sweta Pandey — B.Tech CSE at LNCT Bhopal, Full Stack Developer specializing in React.js, Next.js, Node.js, MongoDB.',
  alternates: { canonical: 'https://my-portfolio-jet-phi-22.vercel.app/resume' },
};

export const revalidate = 60;

export default async function ResumePage() {
  let resumeUrl = '';

  try {
    const res = await fetchResume();
    if (res?.data) {
      resumeUrl = res.data.resumeURL || res.data.resumeUrl || '';
    }
  } catch (err) {
    console.warn('Resume fetch fallback:', err.message);
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      <Navbar resumeUrl={resumeUrl} />
      <ResumeViewer resumeUrl={resumeUrl} />
      <Footer />
    </main>
  );
}
