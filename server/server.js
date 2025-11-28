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

// CORS FIX – THIS IS THE EXACT CONFIG THAT WORKS
app.use(cors({
  origin: "http://localhost:5173",   // Vite default port
  credentials: true,                 // allows cookies
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);

// Optional: trust proxy if deploying later
// app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import songRoutes from "./routes/songs.js";
// import playlistRoutes from "./routes/playlists.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cookieParser());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/songs", songRoutes);
// app.use("/api/playlists", playlistRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
