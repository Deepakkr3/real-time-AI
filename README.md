# real-time-AI
A minimal, step‑by‑step starter to record voice in a React frontend, send the audio to a Node/Express backend, and get a Gemini response back

🚀 Features

🎤 Record audio directly from the browser

📂 Upload audio files (e.g., .wav, .m4a, .mp3)

🔗 Send audio to backend and forward it to Gemini API

🤖 AI-powered responses displayed in real-time

📱 Fully responsive UI with a clean, modern design



🛠️ Tech Stack

Frontend: React.js (Vite)

Backend: Node.js, Express.js

AI Model: Gemini API (free tier)

Other: Multer (file upload), CORS, Fetch API

📂 Project Structure
voice-to-gemini/
├── backend/ # Express.js server
│ ├── index.js # API routes
│ ├── uploads/ # Uploaded audio files
│ └── package.json
│
├── frontend/ # React app (Vite)
│ ├── src/
│ │ ├── App.jsx # Main component
│ │ └── components/ # UI components
│ └── package.json
│
└── README.md


⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/Deepakkr3/real-time-AI
cd voice-to-gemini

2️⃣ Backend Setup (Node + Express)
cd backend
npm install

Create a .env file inside backend/:
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
npm start

3️⃣ Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev
The frontend will run at: http://localhost:5173


📌 Future Enhancements
🔊 Add AI Text-to-Speech playback

💾 Store chat history in MongoDB/Postgres

🎨 More advanced UI with Tailwind/Material UI

☁️ Deployment on Vercel (frontend) + Render/Heroku (backend)
