import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogClientComponent from '@/components/BlogClientComponent';
import { fetchBlogs, fetchResume } from '@/utils/api';

export const metadata = {
  title: 'Technical Blog | Full Stack Engineering Articles by Sweta Pandey',
  description: 'Read technical articles, tutorials, and engineering insights on Next.js, Express, MongoDB, 3D WebGL, and Security published by Sweta Pandey.',
  alternates: {
    canonical: 'https://sweta-portfolio.vercel.app/blog',
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  let blogs = [];
  let resumeUrl = '';

  try {
    const [blogRes, resRes] = await Promise.allSettled([
      fetchBlogs(),
      fetchResume(),
    ]);

    if (blogRes.status === 'fulfilled' && blogRes.value?.data) {
      blogs = blogRes.value.data;
    }
    if (resRes.status === 'fulfilled' && resRes.value?.data) {
      resumeUrl = resRes.value.data.resumeURL || resRes.value.data.resumeUrl || '';
    }
  } catch (err) {
    console.error('Error loading blog page server data:', err);
  }

  return (
    <main className="min-h-screen bg-slate-50/60 pt-28 pb-16">
      <Navbar resumeUrl={resumeUrl} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <i className="ri-article-line text-sm"></i>
            <span>Engineering Insights & Articles</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Sweta Pandey <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Thoughts, technical tutorials, and full-stack engineering insights published by Sweta.
          </p>
        </div>

        {/* Client Interactive Blog Reader Component */}
        <BlogClientComponent initialBlogs={blogs} />
      </div>

      <Footer />
    </main>
  );
}
