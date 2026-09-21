# 📄 AI Docs Generator

> Transform raw text into professional documents — resumes, SOPs, meeting notes, reports, and more — in seconds using AI.

![AI-Powered](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Google-Gemini-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## 🌐 Live Demo

**→ [https://your-app.vercel.app](https://your-app.vercel.app)**

---

## 📋 What is this?

Writing professional documents — resumes, SOPs, reports, meeting notes — takes hours and most people never get around to it.

**AI Docs Generator** solves this. Pick a document type, describe what you need (or paste raw content), and AI instantly generates a structured, downloadable document with the right format, sections, and tone.

From **8 document types**: Resume / CV, SOP, Notes, Reports, Study Material, Articles, Meeting Notes, and Project Documentation.

---

## ✨ Features

- 🤖 **AI Generation** — Google Gemini generates tailored output per document type
- 📐 **Structured Output** — SOPs and Resumes return strict JSON, not walls of text
- 🔁 **Multi-Model Fallback** — Tries 3 Gemini models in sequence for reliability
- 📄 **PDF Export** — Server-side PDFKit generation with proper formatting
- 🔐 **JWT Auth** — Passwordless OTP email login + Google OAuth
- 🏢 **Workspaces** — Every user gets an isolated workspace
- 🎨 **Themed UI** — 8 document types with unique colors, icons, and categories
- 🔍 **Search & Filter** — Find document types by name, category, or tag
- 🌙 **Dark Mode** — Full dark mode across all pages
- 📱 **Responsive** — Works on desktop, tablet, and mobile

---

## 📄 Supported Document Types

| Type | Category | Output |
|---|---|---|
| Resume / CV | Career | Structured JSON |
| SOP | Business | Structured JSON |
| Notes | Learning | Plain text |
| Reports | Business | Plain text |
| Study Material | Learning | Plain text |
| Articles | Content | Plain text |
| Meeting Notes | Business | Plain text |
| Project Documentation | Development | Plain text |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework |
| Tailwind CSS | Styling + Dark mode |
| Framer Motion | Animations |
| Axios | API calls with JWT interceptor |
| React Router | Navigation + Protected routes |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Google Gemini API | AI document generation |
| PDFKit | Server-side PDF generation |
| Resend | OTP email delivery |
| Abstract API | Email validation |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (free tier works)
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))
- Resend API key (for OTP emails)

### 1. Clone the repository
```bash
git clone https://github.com/yourname/ai-docs-generator.git
cd ai-docs-generator