# 🎙️ Real-Time AI (Voice to Gemini)

A minimal, step-by-step starter to **record voice in a React frontend**, send the audio to a **Node/Express backend**, and get a **Gemini response** back in real-time.

---

## 🚀 Features
- 🎤 Record audio directly from the browser  
- 📂 Upload audio files (`.wav`, `.m4a`, `.mp3`)  
- 🔗 Send audio to backend and forward it to Gemini API  
- 🤖 AI-powered responses displayed in real-time  
- 📱 Fully responsive UI with a clean, modern design  

---

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite)  
- **Backend:** Node.js, Express.js  
- **AI Model:** Gemini API (Free Tier)  
- **Other:** Multer (file upload), CORS, Fetch API  

---

## 📂 Project Structure
```bash
voice-to-gemini/
├── backend/              # Express.js server
│   ├── index.js          # API routes
│   ├── uploads/          # Uploaded audio files
│   └── package.json
│
├── frontend/             # React app (Vite)
│   ├── src/
│   │   ├── App.jsx       # Main component
│   │   └── components/   # UI components
│   └── package.json
│
└── README.md
