# 🤖 AI-Powered SOP Generator

> Transform any process description into a structured Standard Operating Procedure in seconds using AI.

![SOP Generator](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Hub-blue?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-8%20Passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## 🌐 Live Demo

**→ [https://sop-generator-iota.vercel.app](https://www.generatordocs.me/)**

---

## 📋 What is this?

Every growing business loses knowledge when employees leave. Writing SOPs manually takes days and never gets done.

**SOP Generator** solves this — paste or type any process description, and AI instantly structures it into a professional, numbered Standard Operating Procedure with roles, warnings, time estimates, and exportable PDF.

---

## ✨ Features

- 🧠 **AI Generation** — Groq Llama 3.3-70b creates detailed 5-8 step SOPs instantly
- 🎤 **Voice Input** — Speak your process, AI transcribes and structures it
- 📄 **PDF Export** — Download professional PDFs with one click
- 🔐 **JWT Auth** — Secure register/login with bcrypt password hashing
- 🗂️ **SOP Management** — View, search, and delete all your SOPs
- 📋 **Templates** — 6 ready-made templates for common business processes
- 🌙 **Dark Mode** — Full dark mode across all pages
- 🏢 **Workspace** — Each user gets their own isolated workspace
- 📱 **Responsive** — Works perfectly on desktop and mobile
- 🐳 **Dockerized** — Run anywhere with Docker

---

## 🐳 Docker Hub

Run the entire app with just Docker — no Node.js or MongoDB required:

```bash
# Pull images
docker pull manishsuriyal/sop-generator-server:latest
docker pull manishsuriyal/sop-generator-client:latest
```

Create a `docker-compose.yml`:
```yaml
services:
  server:
    image: manishsuriyal/sop-generator-server:latest
    ports:
      - "5000:5000"
    env_file:
      - .env

  client:
    image: manishsuriyal/sop-generator-client:latest
    ports:
      - "80:80"
    depends_on:
      - server
```

Then run:
```bash
docker-compose up
```

Open `http://localhost` — done! 🎉

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework |
| Tailwind CSS | Styling + Dark mode |
| Zustand | Global state management |
| Axios | API calls with JWT interceptor |
| React Router | Navigation + Protected routes |
| React Speech Recognition | Voice input |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password hashing |
| Groq (Llama 3.3-70b) | AI SOP generation |
| PDFKit | PDF generation |
| Resend | Contact form emails |
| CORS | Cross-origin requests |

### DevOps & Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |
| Docker + docker-compose | Containerization |
| Docker Hub | Image registry |
| Jest + Supertest | Integration testing |

---

## 🧪 Tests

```bash
cd server
npm test
```
---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repository
```bash
git clone https://github.com/manish012321/SOP-Generator.git
cd SOP-Generator
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
PORT=5000
CLIENT_URL=http://localhost:5173
RESEND_API_KEY=your_resend_key
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### 4. Open in browser
http://localhost:5173


---

## 📁 Project Structure

sop-generator/
├── client/ # React frontend
│ ├── Dockerfile
│ ├── nginx.conf
│ └── src/
│ ├── api/
│ │ └── axios.js # Axios + JWT interceptor
│ ├── components/
│ │ ├── Header.jsx
│ │ └── ProtectedRoute.jsx
│ ├── pages/
│ │ ├── Home.jsx # Landing page
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx # SOP generator
│ │ ├── SopList.jsx # SOP management
│ │ ├── Templates.jsx
│ │ ├── Contact.jsx
│ │ └── HowItWorks.jsx
│ ├── store/
│ │ └── authStore.js # Zustand auth store
│ └── App.jsx
│
├── server/ # Express backend
│ ├── Dockerfile
│ └── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── sopController.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Workspace.js
│ │ ├── sop.schema.js
│ │ └── Job.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── sopRoutes.js
│ │ └── contactRoute.js
│ ├── services/
│ │ ├── aiService.js # Groq AI integration
│ │ └── pdfService.js # PDF generation
│ ├── tests/
│ │ ├── auth.test.js
│ │ └── sop.test.js
│ ├── app.js
│ └── index.js
│
└── docker-compose.yml

---

## 🔌 API Endpoints

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user + workspace | No |
| POST | `/api/auth/login` | Login + return JWT | No |
| POST | `/api/sops` | Generate new SOP with AI | Yes |
| GET | `/api/sops` | Get all SOPs for workspace | Yes |
| DELETE | `/api/sops/:id` | Delete SOP | Yes |
| GET | `/api/sops/:id/export/pdf` | Download PDF | Yes |
| POST | `/api/contact` | Send contact form email | No |

---

## 🧠 How It Works
User types or speaks process description
↓
Frontend sends to POST /api/sops with JWT token
↓
JWT middleware verifies token → attaches req.user
↓
Groq AI (Llama 3.3-70b) structures the text into:
→ Professional title
→ Overview paragraph
→ 5-8 numbered steps
→ Role per step
→ Time estimate per step
→ Warnings for critical actions
↓
Saved to MongoDB with workspaceId
↓
Displayed on dashboard
↓
User downloads as PDF via PDFKit
---

## 🔒 Environment Variables

### Server
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GROQ_API_KEY` | Groq API key for AI generation |
| `PORT` | Server port (default 5000) |
| `CLIENT_URL` | Frontend URL for CORS |
| `RESEND_API_KEY` | Resend API key for contact emails |

### Client
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 📦 Deployment

### Backend (Render)
1. Connect GitHub repo to Render
2. Set root directory → `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set root directory → `client`
3. Add `VITE_API_URL` environment variable
4. Deploy

### Docker (anywhere)
```bash
docker-compose up
```

---

## 🔮 Roadmap

- [x] AI SOP generation
- [x] PDF export
- [x] Voice input
- [x] Dark mode
- [x] Templates library
- [x] Docker + Docker Hub
- [x] Jest integration tests
- [ ] SOP editing inline
- [ ] Public sharing links
- [ ] Flowchart generation
- [ ] Team workspaces
- [ ] Razorpay billing
- [ ] Word/Docx export
- [ ] Chrome extension
- [ ] Mobile app

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Manish Suriyal**
- 🌐 Portfolio: [manishsuriyal.dev](https://www.manishsuriyal.dev)
- 🐙 GitHub: [@manish012321](https://github.com/manish012321)
- 🐳 Docker Hub: [manishsuriyal](https://hub.docker.com/u/manishsuriyal)
- 🚀 Live App: [sop-generator-iota.vercel.app](https://sop-generator-iota.vercel.app)

---

## ⭐ Show your support

Give a ⭐ if this project helped you!
