import express from "express";
import { getSongs, addSong, searchSongs, toggleLike, getLikedSongs } from "../controllers/songController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/search",protect, searchSongs);
router.post("/", protect, addSong);
router.post("/like", protect, toggleLike);
router.get("/liked", protect, getLikedSongs);

export default router;