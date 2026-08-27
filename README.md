# 🚀 myPortfolio - Full-Stack Developer Portfolio

A modern, production-ready full-stack portfolio web application built with **Node.js**, **Express.js**, **MongoDB Atlas**, **React**, and **Vite**. Features OTP-based admin authentication, JWT security middleware, and complete RESTful CRUD APIs for managing Projects, Skills, Experience, and Messages.

---

## ✨ Features

- 🔒 **OTP-based Admin Authentication**: Secure 2-step login with dynamic OTP generation & 5-minute expiration window.
- 🔑 **JWT Security Middleware**: Protected admin routes (`POST`, `PUT`, `DELETE`) requiring Bearer Authorization tokens.
- 📂 **Projects Management**: Full CRUD REST endpoints for showcasing projects with tech stack, live links, and GitHub links.
- ⚡ **Skills Showcase**: Categorized technical skills with proficiency levels and icon URLs.
- 💼 **Experience Timeline**: Manage work & education history records.
- 📬 **Contact Inquiry System**: Message storage and inquiry notification endpoints.
- 🌐 **Public & Admin Access Control**: Read-only public access for visitors and protected mutation access for the Admin.

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Environment**: Dotenv
- **Dev Tool**: Nodemon

### **Frontend**
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Modern CSS

---

## 📂 Project Structure

```text
myPortfolio/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection setup
│   │   ├── controller/      # API Controllers (Auth, Project, Skill, Experience, Message)
│   │   ├── middlewares/     # JWT Auth Protection Middleware
│   │   ├── models/          # Mongoose Database Schemas
│   │   ├── routes/          # Express API Routers
│   │   └── utils/           # Utility functions (OTP Generator)
│   ├── .env                 # Environment variables (ignored by Git)
│   └── server.js            # Express Server entry point
│
└── frontend/
    ├── public/              # Static assets
    ├── src/                 # React UI Components & Pages
    └── vite.config.js       # Vite configuration
```

---

## 🔌 API Endpoints Summary

### 🔐 Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Validate admin credentials & send OTP | Public |
| `POST` | `/api/auth/verifyOtp` | Verify OTP & generate JWT Token | Public |
| `POST` | `/api/auth/resend-otp` | Generate & resend new OTP | Public |

### 📁 Projects Routes (`/api/project`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/project/` | Fetch all projects | Public |
| `POST` | `/api/project/create` | Create a new project | Protected (JWT) |
| `PUT` | `/api/project/update/:id` | Update project details | Protected (JWT) |
| `DELETE` | `/api/project/delete/:id` | Delete a project | Protected (JWT) |

### ⚡ Skills Routes (`/api/skills`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/skills/` | Fetch all skills | Public |
| `POST` | `/api/skills/create` | Add a new skill | Protected (JWT) |
| `PUT` | `/api/skills/update/:id` | Update skill details | Protected (JWT) |
| `DELETE` | `/api/skills/delete/:id` | Delete a skill | Protected (JWT) |

### 💼 Experience Routes (`/api/experience`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/experience/` | Fetch experience history | Public |
| `POST` | `/api/experience/create` | Add work/education record | Protected (JWT) |
| `PUT` | `/api/experience/update/:id` | Update experience record | Protected (JWT) |
| `DELETE` | `/api/experience/delete/:id` | Delete experience record | Protected (JWT) |

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB Atlas Account**

### 2️⃣ Environment Configuration (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI="your_mongodb_atlas_connection_string"
PORT=3002
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your_admin_password"
JWT_SECRET="your_jwt_secret_key"
```

### 3️⃣ Installation & Running Locally

#### **Backend Setup**:
```bash
cd backend
npm install
node server.js
```

#### **Frontend Setup**:
```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Security Best Practices
- Environment variables (`.env`) are strictly ignored via `.gitignore` to prevent credential leaks.
- Passwords containing special characters in `.env` are safely enclosed in quotes.
- Protected API routes check for valid `Bearer <token>` headers via `authMiddleware`.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
