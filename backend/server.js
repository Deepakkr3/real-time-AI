import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";

import cors from "cors";

const app = express();
dotenv.config
const apiKey = process.env.GEMINI_API_KEY||"AIzaSyA1mXOxv27Ij7wHal5UdIOS-qXrEhvvfN8"
app.use(cors({
origin: "http://localhost:5173", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

dotenv.config();

const upload = multer({ dest: "uploads/" });

app.use(express.json()); 

app.post("/ask", upload.single("audio"), async (req, res) => {
  try {
    let parts = [];

    if (req.file) {
      
      const filePath = req.file.path;
      const audioData = fs.readFileSync(filePath).toString("base64");

      parts.push({
        inline_data: {
          mime_type: "audio/webm", 
          data: audioData,
        },
      });

      fs.unlinkSync(filePath);
    } else if (req.body.question) {
      
      parts.push({ text: req.body.question });
    } else {
      return res.status(400).json({ error: "Send either audio or text" });
    }

   
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
        }),
      }
    );

    const data = await response.json();
    const textReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

    res.json({ reply: textReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));







// import express from "express";
// import multer from "multer";
// import fetch from "node-fetch";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();
// const app = express();
// const upload = multer({ dest: "uploads/" });

// app.post("/ask", upload.single("audio"), async (req, res) => {
//   try {
//     console.log("req001",req.file, req.body);
//     const filePath = req.file.path;

//     // Read file and encode to base64
//     const audioData = fs.readFileSync(filePath).toString("base64");

//     // Call Gemini API
//     key="AIzaSyA1mXOxv27Ij7wHal5UdIOS-qXrEhvvfN8"
//     const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA1mXOxv27Ij7wHal5UdIOS-qXrEhvvfN8"
//     const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA1mXOxv27Ij7wHal5UdIOS-qXrEhvvfN8?key=" + "AIzaSyA1mXOxv27Ij7wHal5UdIOS-qXrEhvvfN8", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 inline_data: {
//                   mime_type: "audio/webm",
//                   data: audioData
//                 }
//               }
//             ]
//           }
//         ]
//       })
//     });

//     const data = await response.json();
//     const textReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

//     fs.unlinkSync(filePath); // delete temp file
//     res.json({ reply: textReply });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));
