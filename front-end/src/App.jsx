import React, { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleRecord = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/m4a" });
        audioChunksRef.current = [];
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.m4a");

        try {
        const res = await axios.post("http://localhost:5000/ask", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          const data = await res.data.reply 
          setResponse(data || "No response from server");
        } catch (err) {
          console.error(err);
          setResponse("Error uploading audio");
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>🎙️ RattanIndia</h1>
        <p className="subtitle">Talk to Rev</p>
        <p className="description">Click the button to start or stop recording</p>
        <button className={`record-btn ${isRecording ? "stop" : "start"}`} onClick={handleRecord}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {response && (
          <div className="response-box">
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>

      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          font-family: Arial, sans-serif;
        }

        .card {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0px 6px 20px rgba(0,0,0,0.2);
          max-width: 400px;
          width: 90%;
        }

        h1 {
          margin: 0;
          font-size: 2.2rem;
          color: #6a11cb;
        }

        .subtitle {
          font-size: 1.2rem;
          margin: 10px 0;
          color: #444;
        }

        .description {
          font-size: 0.95rem;
          margin-bottom: 20px;
          color: #666;
        }

        .record-btn {
          padding: 14px 28px;
          font-size: 1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          color: white;
          background: #2575fc;
          transition: all 0.3s;
        }

        .record-btn.start {
          background: #2575fc;
        }

        .record-btn.stop {
          background: #ff4b5c;
        }

        .record-btn:hover {
          opacity: 0.9;
        }

        .response-box {
          margin-top: 20px;
          padding: 15px;
          background: #f8f8f8;
          border-left: 4px solid #2575fc;
          text-align: left;
          border-radius: 8px;
        }

        .response-box h3 {
          margin: 0 0 10px 0;
          font-size: 1rem;
          color: #333;
        }

        .response-box p {
          margin: 0;
          font-size: 0.95rem;
          color: #444;
        }

        @media (max-width: 480px) {
          h1 { font-size: 1.8rem; }
          .subtitle { font-size: 1rem; }
          .record-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default App;
