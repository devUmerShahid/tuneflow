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

// FINAL CORS — WORKS IN LOCAL + PRODUCTION
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:5000",
  "https://tuneflow-lime.vercel.app",  // ← YOUR VERCEL URL
  "https://tuneflow-yourname.vercel.app"  // ← Add if you redeploy
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);  // Debug log
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true  // This allows cookies
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "TuneFlow API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






// // server/server.js
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

// // THIS IS THE ONLY CORS CONFIG THAT WORKS WITH COOKIES IN DEV
// app.use(
//   cors({
//     origin: (origin, callback) => {

//       if (!origin) return callback(null, true);
      
//       // Allow localhost:5173, 5174, etc.
//       if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,  // REQUIRED for cookies
//   })
// );

// app.use(cookieParser());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/songs", songRoutes);
// app.use("/api/playlists", playlistRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log("CORS: localhost allowed + credentials enabled");
// });









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
