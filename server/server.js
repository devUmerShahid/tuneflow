// server/server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import playlistRoutes from "./routes/playlists.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

// ALLOWED ORIGINS — UPDATE WHEN YOU CHANGE VERCEL URL
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://tuneflow-lime.vercel.app",
  "https://tuneflow.vercel.app", // backup
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, mobile apps, etc.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("CORS BLOCKED:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // REQUIRED for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "TuneFlow API is LIVE",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: https://tuneflow-lime.vercel.app`);
});