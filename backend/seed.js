require('dotenv').config();
const mongoose = require('mongoose');
const ProjectModel = require('./src/models/projectModel');
const SkillsModel = require('./src/models/SkillModel');
const ExperienceModel = require('./src/models/ExperienceModel');
const resumeModel = require('./src/models/resumeModel');
const BlogModel = require('./src/models/blogModel');

const MONGODB_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully!');

        // 1. Seed Cloudinary Resume Link
        const resumeUrl = "https://res.cloudinary.com/akphv6j6/image/upload/v1740000000/Sweta_Pandey_Resume.pdf";
        await resumeModel.deleteMany({});
        await resumeModel.create({ resumeURL: resumeUrl, resumeUrl: resumeUrl });
        console.log('✓ Cloudinary Resume URL seeded successfully');

        // 2. Seed Education Entries
        await ExperienceModel.deleteMany({});
        const experienceEntries = [
            {
                title: "Bachelor of Technology (B.Tech) - Computer Science Engineering",
                organization: "Lakshmi Narain College of Technology (LNCT)",
                description: "Coursework: Object Oriented Programming (OOP), Data Structures & Algorithms, Database Management System (DBMS), Computer Networks, and Operating Systems.",
                startDate: new Date("2023-08-01"),
                endDate: new Date("2026-06-30"),
                current: true,
                type: "education",
                location: "Bhopal, Madhya Pradesh, India"
            },
            {
                title: "Diploma in Computer Science Engineering",
                organization: "Patel College of Science & Technology (PCST)",
                description: "Foundational computer science studies, C programming, web technologies (HTML/CSS), computer hardware, and operating systems.",
                startDate: new Date("2020-08-01"),
                endDate: new Date("2023-06-30"),
                current: false,
                type: "education",
                location: "Bhopal, Madhya Pradesh, India"
            },
            {
                title: "Class 10th (Secondary Education)",
                organization: "Holy Garden Model Public School",
                description: "Secondary education coursework in Science, Mathematics, English, and Social Sciences.",
                startDate: new Date("2017-04-01"),
                endDate: new Date("2018-03-31"),
                current: false,
                type: "education",
                location: "West Bengal, India"
            }
        ];
        await ExperienceModel.insertMany(experienceEntries);
        console.log('✓ Education entries seeded successfully');

        // 3. Seed Tech Stack Items (Pure Tech Stack without percentages)
        await SkillsModel.deleteMany({});
        const techStackEntries = [
            { Name: "React.js", category: "Frontend", icon: "ri-reactjs-fill", color: "#61DAFB" },
            { Name: "Next.js", category: "Frontend", icon: "ri-nextjs-fill", color: "#000000" },
            { Name: "JavaScript (ES6+)", category: "Frontend", icon: "ri-javascript-fill", color: "#F7DF1E" },
            { Name: "HTML5", category: "Frontend", icon: "ri-html5-fill", color: "#E34F26" },
            { Name: "CSS3", category: "Frontend", icon: "ri-css3-fill", color: "#1572B6" },
            { Name: "Node.js", category: "Backend & Database", icon: "ri-nodejs-fill", color: "#339933" },
            { Name: "Express.js", category: "Backend & Database", icon: "ri-server-fill", color: "#404040" },
            { Name: "MongoDB", category: "Backend & Database", icon: "ri-database-2-fill", color: "#47A248" },
            { Name: "Python", category: "Backend & Database", icon: "ri-command-line", color: "#3776AB" },
            { Name: "C Programming", category: "Core CS & Tools", icon: "ri-code-s-slash-line", color: "#A8B9CC" },
            { Name: "Data Structures & OOP", category: "Core CS & Tools", icon: "ri-cpu-fill", color: "#6366F1" },
            { Name: "DBMS & SQL", category: "Backend & Database", icon: "ri-table-fill", color: "#0284C7" },
            { Name: "Computer Networks", category: "Core CS & Tools", icon: "ri-global-fill", color: "#0D9488" },
            { Name: "Operating Systems", category: "Core CS & Tools", icon: "ri-terminal-window-fill", color: "#4F46E5" },
            { Name: "Git & GitHub", category: "Core CS & Tools", icon: "ri-git-branch-fill", color: "#F05032" },
            { Name: "VS Code", category: "Core CS & Tools", icon: "ri-code-box-fill", color: "#007ACC" },
            { Name: "Cyber Security (PWC Certified)", category: "Core CS & Tools", icon: "ri-shield-check-fill", color: "#10B981" }
        ];
        await SkillsModel.insertMany(techStackEntries);
        console.log('✓ Tech Stack entries seeded successfully (percentages removed)');

        // 4. Seed Projects
        await ProjectModel.deleteMany({});
        const projectEntries = [
            {
                title: "Full Stack Portfolio Showcase",
                descriptions: "A full-stack portfolio built with Next.js, Node.js, Express, MongoDB, and animated with Three.js & GSAP. Features live email notification alerts and an OTP-protected admin control panel.",
                techStack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Three.js"],
                imageURL: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                liveLINK: "https://my-portfolio-jet-phi-22.vercel.app",
                gitHub: "https://github.com/swetapandey-dev/myPortfolio",
                featured: true
            },
            {
                title: "Python File Organizer",
                descriptions: "Developed a Python-based automation tool that automatically categorizes files into structured folders based on file extensions using OS and Shutil modules to minimize manual file sorting.",
                techStack: ["Python", "Automation", "OS Module", "Shutil"],
                imageURL: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
                liveLINK: "https://github.com/swetapandey-dev",
                gitHub: "https://github.com/swetapandey-dev",
                featured: true
            },
            {
                title: "Weather Information App",
                descriptions: "Built a Python weather application retrieving real-time weather metrics for global cities via REST API integration, HTTP requests, and structured JSON parsing.",
                techStack: ["Python", "REST API", "Requests", "JSON Parsing"],
                imageURL: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
                liveLINK: "https://github.com/swetapandey-dev",
                gitHub: "https://github.com/swetapandey-dev",
                featured: false
            },
            {
                title: "Web Scraper & Data Extractor",
                descriptions: "Developed an automated web scraper tool using Requests and BeautifulSoup libraries to extract, clean, and format structured website content.",
                techStack: ["Python", "BeautifulSoup", "Requests", "Data Processing"],
                imageURL: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80",
                liveLINK: "https://github.com/swetapandey-dev",
                gitHub: "https://github.com/swetapandey-dev",
                featured: false
            }
        ];
        await ProjectModel.insertMany(projectEntries);
        console.log('✓ Projects seeded successfully');

        // 5. Seed Blogs
        await BlogModel.deleteMany({});
        const blogEntries = [
            {
                title: "Building Scalable Full-Stack Apps with Next.js & Express",
                content: `Developing modern full-stack web applications requires a clean separation of concerns, robust API contracts, and reliable state management. 
                In this article, we explore how combining Next.js for server-side rendering and static optimization with an Express & MongoDB backend provides ultimate flexibility.
                Key takeaways include JWT session management, CORS policies, environment variable isolation, and automated database indexes.`,
                excerpt: "Learn architectural best practices, API authentication, and state management when combining Next.js with a Node.js Express backend.",
                category: "Full Stack",
                readTime: "5 min read",
                imageURL: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
                author: "Sweta Pandey"
            },
            {
                title: "Mastering Three.js 3D WebGL in Next.js App Router",
                content: `Visual delight and micro-animations significantly elevate user retention. 
                By pairing Three.js buffer geometries with GSAP ScrollTrigger and Lenis smooth scrolling, developers can create immersive 3D WebGL landscapes.`,
                excerpt: "How to integrate 3D WebGL particle canvases with smooth scroll libraries in Next.js without compromising mobile performance.",
                category: "3D & Motion",
                readTime: "7 min read",
                imageURL: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
                author: "Sweta Pandey"
            },
            {
                title: "Securing REST APIs with OTP Verification & JWT Authentication",
                content: `Security is paramount for admin dashboards and user portals. 
                Using One-Time Password (OTP) verification delivered directly via email ensures administrative actions remain protected against brute force attacks.`,
                excerpt: "A step-by-step guide to setting up double-factor OTP email verification using Nodemailer and JWT tokens.",
                category: "Security",
                readTime: "6 min read",
                imageURL: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
                author: "Sweta Pandey"
            }
        ];
        await BlogModel.insertMany(blogEntries);
        console.log('✓ Tech Blogs seeded successfully');

        console.log('--- SEEDING FINISHED WITH CLOUDINARY RESUME ---');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding MongoDB Atlas:', err);
        process.exit(1);
    }
};

seedDatabase();
