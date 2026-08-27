import 'remixicon/fonts/remixicon.css';
import './globals.css';
import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });

export const metadata = {
  metadataBase: new URL('https://sweta-portfolio.vercel.app'),
  title: {
    default: 'Sweta Pandey | Full Stack Web Developer & Software Engineer',
    template: '%s | Sweta Pandey Portfolio'
  },
  description: 'Official portfolio of Sweta Pandey, a Full Stack Web Developer & Computer Science Engineer (B.Tech LNCT Bhopal) specializing in React.js, Next.js, Node.js, Express, MongoDB, Python, and Cyber Security.',
  keywords: [
    'Sweta Pandey',
    'Sweta Pandey Portfolio',
    'Sweta Pandey LNCT Bhopal',
    'Full Stack Developer Bhopal',
    'MERN Stack Developer',
    'React.js Developer',
    'Next.js Developer India',
    'Python Developer',
    'Software Engineer Portfolio',
    'Web Developer West Bengal'
  ],
  authors: [{ name: 'Sweta Pandey', url: 'https://sweta-portfolio.vercel.app' }],
  creator: 'Sweta Pandey',
  publisher: 'Sweta Pandey',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sweta-portfolio.vercel.app',
  },
  openGraph: {
    title: 'Sweta Pandey | Full Stack Web Developer',
    description: 'Explore full-stack web applications, Python tools, tech articles, and contact Sweta Pandey for software engineering roles.',
    url: 'https://sweta-portfolio.vercel.app',
    siteName: 'Sweta Pandey Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Sweta Pandey Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sweta Pandey | Full Stack Web Developer',
    description: 'Full Stack Web Developer & B.Tech Computer Science student at LNCT Bhopal.',
    creator: '@SwetaPandey612',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sweta Pandey',
    url: 'https://sweta-portfolio.vercel.app',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    sameAs: [
      'https://www.linkedin.com/in/sweta-pandey-dev/',
      'https://www.instagram.com/_sweta__pandey',
      'https://www.facebook.com/share/1Dfd99FRPW/',
      'https://x.com/SwetaPandey612'
    ],
    jobTitle: 'Full Stack Web Developer',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Lakshmi Narain College of Technology (LNCT), Bhopal'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Patel College of Science & Technology (PCST), Bhopal'
    },
    knowsAbout: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Python',
      'Cyber Security',
      'REST APIs'
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
