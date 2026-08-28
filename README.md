# 🚀 Sweta Pandey — Full-Stack Developer Portfolio & Admin Control Portal

A modern, production-grade full-stack developer portfolio and content management portal engineered with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **Node.js**, **Express.js**, **MongoDB Atlas**, **Cloudinary Media Engine**, and **Resend Email API**.

---

## ✨ Features & Highlights

- 🔒 **OTP-Protected Admin Portal**: 2-Step secure admin authentication with dynamic 6-digit OTP generation and instant Resend email delivery.
- 🔑 **JWT Authorization Security**: Protected mutation routes (`POST`, `PUT`, `DELETE`) enforced via JWT Bearer Token validation.
- 📸 **Cloudinary Media Engine & Canvas Crop Editor**:
  - Interactive circular drag-and-zoom image cropping modal (`react-image-crop` + HTML5 Canvas).
  - Site-wide reactive avatar state via React `ProfileContext`.
  - Seamless PDF resume upload, database sync, and 1-click delete capabilities.
- 📄 **Resume Viewer & Native JS Blob Downloader**:
  - Dual viewing engine: HD visual page rendering + embedded Google Docs Viewer fallback.
  - Native 1-click JS Blob downloader preventing browser CORS and 401 blocks.
- 📂 **Full CRUD Projects Showcase**:
  - Featured projects sorted first automatically.
  - Interactive **See More Projects** toggle (3-column responsive grid).
  - Admin modal supporting full schemas (Title, Description, Tech Stack, Image URL, Live Link, GitHub link, Featured flag).
- ⚡ **Skills & Education Timeline**: Categorized technical competencies with proficiency bars and Remix icons; education history records.
- ✍️ **Technical Blog Platform**: Express & MongoDB backend powering technical articles with categories, read-time estimates, and excerpts.
- 📬 **Dual-Channel Contact System**: Messages stored in MongoDB with live notifications via Resend API and EmailJS client fallback.
- 🎨 **Typography & Design Aesthetics**: Powered by the official **rsms.me Inter Font (`Inter var`)** with glassmorphism UI card styling.
- 🖼️ **Social Sharing OpenGraph Card**: Custom dark-purple open-graph preview card (`og-image.jpg`) for LinkedIn, Twitter, and WhatsApp link previews.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **UI & Logic**: React 19, HTML5 Canvas
- **Styling**: Tailwind CSS, Vanilla CSS
- **Animations & Visuals**: Three.js, GSAP
- **Icons & Typography**: Remix Icons (`remixicon`), Inter Font (`rsms.me/inter`)
- **State Management**: React Context API (`ProfileContext`)
- **HTTP Client**: Axios (with custom timeout & Bearer token interceptors)

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **File & Media Storage**: Cloudinary SDK + `multer-storage-cloudinary`
- **Email Delivery**: Resend Node.js SDK
- **Security & Auth**: JSON Web Tokens (JWT), Dotenv, CORS

---

## 📂 Project Structure

```text
myPortfolio/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # MongoDB Atlas Mongoose connection
│   │   │   └── cloudinaryUpload.js   # Multer + Cloudinary storage configurations
│   │   ├── controller/
│   │   │   ├── authController.js     # OTP login, verify & resend logic
│   │   │   ├── blogController.js     # Blog CRUD handlers
│   │   │   ├── experienceController.js# Education & work experience handlers
│   │   │   ├── messageController.js  # Contact inquiry message handlers
│   │   │   ├── projectController.js  # Projects CRUD handlers
│   │   │   ├── resumeController.js   # Resume database CRUD handlers
│   │   │   ├── skillController.js    # Skills CRUD handlers
│   │   │   └── uploadController.js   # Cloudinary upload & delete handlers
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js     # JWT protection middleware
│   │   ├── models/
│   │   │   ├── ExperienceModel.js    # Mongoose schema for Education/Work
│   │   │   ├── SkillModel.js         # Mongoose schema for Skills
│   │   │   ├── blogModel.js          # Mongoose schema for Tech Blogs
│   │   │   ├── messageModel.js       # Mongoose schema for Messages
│   │   │   ├── projectModel.js       # Mongoose schema for Projects
│   │   │   └── resumeModel.js        # Mongoose schema for Resume & Profile Image
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # /api/auth
│   │   │   ├── blogRoutes.js         # /api/blog
│   │   │   ├── experienceRoutes.js   # /api/experience
│   │   │   ├── messageRoutes.js      # /api/message
│   │   │   ├── projectRoutes.js      # /api/project
│   │   │   ├── resumeRoutes.js       # /api/resume
│   │   │   ├── skillRoutes.js        # /api/skills
│   │   │   └── uploadRoutes.js       # /api/upload
│   │   └── utils/
│   │       ├── generateOtp.js        # 6-Digit random OTP generator
│   │       └── sendEmail.js          # Resend Email SDK dispatcher
│   ├── .env                          # Backend environment variables
│   └── server.js                     # Express server entry point
│
└── frontend/
    ├── public/
    │   ├── og-image.jpg              # OpenGraph social share card
    │   ├── robots.txt
    │   └── sitemap.xml
    ├── src/
    │   ├── app/
    │   │   ├── about/page.jsx        # About Sweta Pandey page
    │   │   ├── admin/page.jsx        # Admin OTP login portal
    │   │   ├── blog/page.jsx         # Technical blogs list page
    │   │   ├── resume/page.jsx       # Resume viewer page
    │   │   ├── globals.css           # Global Tailwind CSS & Inter font import
    │   │   ├── layout.jsx            # Root Layout & metadata
    │   │   └── page.jsx              # Main landing page
    │   ├── components/
    │   │   ├── AboutProfileCard.jsx  # Client profile card component
    │   │   ├── AdminDashboard.jsx    # Complete Admin Management Control Panel
    │   │   ├── ContactSection.jsx    # Contact form section
    │   │   ├── ExperienceSection.jsx # Education timeline component
    │   │   ├── Footer.jsx            # Main footer
    │   │   ├── HeroSection.jsx       # Landing hero section with dynamic stats
    │   │   ├── ImageCropModal.jsx    # Interactive canvas cropper modal
    │   │   ├── Navbar.jsx            # Header navigation bar
    │   │   ├── ProjectsSection.jsx   # Featured-first projects grid with See More
    │   │   ├── ResumeViewer.jsx      # Multi-mode PDF & HD image resume viewer
    │   │   └── SkillsSection.jsx     # Technical skills showcase
    │   ├── context/
    │   │   └── ProfileContext.jsx    # Global profile image state context
    │   └── utils/
    │       ├── api.js                # Axios REST API helper functions
    │       └── emailjs.js            # Client-side EmailJS dispatcher
    ├── next.config.js                # Next.js configuration
    └── tailwind.config.js            # Tailwind styling setup
```

---

## 🔌 Complete API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Validate admin email & password, dispatch OTP via Resend | Public |
| `POST` | `/api/auth/verifyOtp` | Verify 6-digit OTP code & return JWT Bearer Token | Public |
| `POST` | `/api/auth/resend-otp` | Generate & send new OTP code | Public |

### 📸 Media Uploads & Settings (`/api/upload`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/upload/settings` | Fetch current profile image and resume PDF URLs | Public |
| `POST` | `/api/upload/image` | Upload profile photo to Cloudinary (Multipart) | Public / Admin |
| `DELETE`| `/api/upload/image` | Delete profile photo from Cloudinary & database | Protected (Admin) |
| `POST` | `/api/upload/resume` | Upload resume PDF to Cloudinary & auto-save MongoDB | Public / Admin |
| `DELETE`| `/api/upload/resume` | Delete resume PDF from Cloudinary & database | Protected (Admin) |

### 📁 Projects (`/api/project`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/project/` | Fetch all listed projects | Public |
| `POST` | `/api/project/create` | Add new project with featured flag & stack | Protected (JWT) |
| `PUT` | `/api/project/update/:id` | Update project details | Protected (JWT) |
| `DELETE`| `/api/project/delete/:id` | Delete project | Protected (JWT) |

### ⚡ Technical Skills (`/api/skills`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/skills/` | Fetch all technical skills | Public |
| `POST` | `/api/skills/create` | Add new technical skill | Protected (JWT) |
| `PUT` | `/api/skills/update/:id` | Update skill proficiency or category | Protected (JWT) |
| `DELETE`| `/api/skills/delete/:id` | Delete skill | Protected (JWT) |

### 💼 Experience & Education (`/api/experience`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/experience/` | Fetch education & experience records | Public |
| `POST` | `/api/experience/create` | Add education or work record | Protected (JWT) |
| `PUT` | `/api/experience/update/:id` | Update education/work record | Protected (JWT) |
| `DELETE`| `/api/experience/delete/:id` | Delete education record | Protected (JWT) |

### ✍️ Technical Blogs (`/api/blog`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/blog/` | Fetch published blog posts | Public |
| `POST` | `/api/blog/create` | Publish new blog post | Protected (JWT) |
| `PUT` | `/api/blog/update/:id` | Edit blog post | Protected (JWT) |
| `DELETE`| `/api/blog/delete/:id` | Delete blog post | Protected (JWT) |

### 📬 Messages (`/api/message`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/message/` | Fetch contact messages | Protected (JWT) |
| `POST` | `/api/message/send` | Submit contact message & trigger notifications | Public |
| `DELETE`| `/api/message/:id` | Delete message record | Protected (JWT) |

---

## ⚙️ Environment Variables

### 1️⃣ Backend Environment (`backend/.env`)
```env
# Database
MONGODB_URI="your_mongodb_connection_string"

# Server Port
PORT=3002

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your_admin_password"

# JWT Secret
JWT_SECRET="your_jwt_secret"

# Cloudinary Media Configuration
CLOUD_NAME="your_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"

# Mail Dispatcher Key
EMAIL_DISPATCH_KEY="your_email_api_key"
```

### 2️⃣ Frontend Environment (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL="your_backend_api_url"
NEXT_PUBLIC_SITE_URL="your_frontend_site_url"

# EmailJS Live Form Notifications
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service_id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template_id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_public_key"
```

---

## 🚀 Getting Started Locally

### 1️⃣ Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB Atlas** Account & Connection String

### 2️⃣ Backend Setup
```bash
cd backend
npm install
node server.js
```
The Express backend server will run on `http://localhost:3002`.

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The Next.js application will launch on `http://localhost:3000`.

---

## 🌐 Production Deployment

- **Frontend**: Deployed on **Vercel** (`https://my-portfolio-jet-phi-22.vercel.app`)
- **Backend**: Deployed on **Render** (`https://myportfolio-owi0.onrender.com`)

---

## 👤 Developer Profile

- **Developer**: Sweta Pandey
- **Degree**: Bachelor of Technology (B.Tech) in Computer Science & Engineering
- **Institution**: Lakshmi Narain College of Technology (LNCT), Bhopal
- **Passing Out Year**: July 2026
- **Email**: `pandeysweta612@gmail.com`
- **Specializations**: Full Stack Web Development (MERN & Next.js), Python Automation, REST APIs, Cyber Security (PWC Certified)

---

## 📝 License

This repository is open-source and available under the [MIT License](LICENSE).
