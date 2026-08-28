import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import {
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchResume,
} from '@/utils/api';

// Enable ISR / Revalidation every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  let projects = [];
  let skills = [];
  let experience = [];
  let resumeUrl = '';

  try {
    const [projData, skillData, expData, resData] = await Promise.allSettled([
      fetchProjects(),
      fetchSkills(),
      fetchExperience(),
      fetchResume(),
    ]);

    if (projData.status === 'fulfilled' && projData.value?.data) {
      projects = projData.value.data;
    }
    if (skillData.status === 'fulfilled' && skillData.value?.data) {
      skills = skillData.value.data;
    }
    if (expData.status === 'fulfilled' && expData.value?.data) {
      experience = expData.value.data;
    }
    if (resData.status === 'fulfilled' && resData.value?.data) {
      resumeUrl = resData.value.data.resumeURL || resData.value.data.resumeUrl || '';
    }
  } catch (err) {
    console.error('Error fetching server-side portfolio data:', err);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar resumeUrl={resumeUrl} />
      <HeroSection resumeUrl={resumeUrl} projectsCount={projects.length} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experience={experience} />
      <ContactSection />
      <Footer />
    </main>
  );
}
