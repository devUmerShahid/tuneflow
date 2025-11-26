import express from "express";
import { getSongs, addSong } from "../controllers/songController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get("/", getSongs);
router.post("/", protect, addSong);

export default router;