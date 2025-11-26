import express from "express";
import {
  createPlaylist,
  getUserPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlistController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.use(protect);
router.post("/", createPlaylist);
router.get("/", getUserPlaylists);
router.post("/add-song", addSongToPlaylist);
router.post("/remove-song", removeSongFromPlaylist);

export default router;