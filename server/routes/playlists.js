import express from "express";
import {
  createPlaylist,
  getUserPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist
} from "../controllers/playlistController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.use(protect);
router.post("/",protect, createPlaylist);
router.get("/",protect, getUserPlaylists);
router.delete("/:id", protect, deletePlaylist);
//router.post("/add", protect, addToPlaylist);
router.post("/remove", protect, removeSongFromPlaylist);
router.post("/add-song", addSongToPlaylist);
// router.post("/remove-song", removeSongFromPlaylist);

export default router;