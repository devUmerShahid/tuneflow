import express from "express";
import {
  createPlaylist,
  getUserPlaylists,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist
} from "../controllers/playlistController.js";
import protect from "../middleware/protect.js";
import Playlist from "../models/Playlist.js";

const router = express.Router();

router.use(protect);
router.post("/", createPlaylist);
router.get("/", getUserPlaylists);
router.delete("/:id", deletePlaylist);
router.post("/add", addToPlaylist);
router.post("/remove", removeFromPlaylist);
router.get("/:id", protect, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Optional: Check ownership
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(playlist);
  } catch (error) {
    console.error("Get playlist error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;