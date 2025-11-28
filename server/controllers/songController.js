import Song from "../models/Song.js";
import axios from "axios";
import User from "../models/User.js";
import mongoose from "mongoose";
//import User from "../models/User.js";

const getSongs = async (req, res) => {
  const songs = await Song.find().sort({ createdAt: -1 });
  res.json(songs);
};

const addSong = async (req, res) => {
  const { title, artist, album, genre, duration, songUrl, imageUrl } = req.body;
  const song = await Song.create({
    title,
    artist,
    album,
    genre,
    duration,
    songUrl,
    imageUrl,
    uploadedBy: req.user._id,
  });
  res.status(201).json(song);
};

//Search songs from Jamendo
const searchSongs = async (req, res) => {
  try {
    const { query = "chill", limit = 12 } = req.query;
    const searchTerm = query.trim() || "chill";

    // YOUR OWN CLIENT ID — NOW WORKS!
    const CLIENT_ID = process.env.JAMENDO_CLIENT_ID || "dfd4e2b6";

    const params = {
      client_id: CLIENT_ID,
      format: "json",
      limit: limit,
      search: searchTerm,
      include: "musicinfo",
      audioformat: "mp32",
      order: "popularity_week"
    };

    console.log("Searching Jamendo for:", searchTerm);

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", { params });

    const tracks = response.data.results || [];

    console.log(`Jamendo returned ${tracks.length} tracks`);

    if (tracks.length === 0) {
      return res.json([]);
    }

    const songs = [];
    for (const track of tracks) {
      let song = await Song.findOne({ jamendoId: track.id });

      if (!song) {
        song = await Song.create({
          title: track.name,
          artist: track.artist_name,
          album: track.album_name || "Single",
          genre: track.musicinfo?.tags?.genres?.join(", ") || "Unknown",
          duration: formatDuration(track.duration),
          songUrl: track.audio,
          imageUrl: track.album_image || track.image,
          jamendoId: track.id,
        });
      }
      songs.push(song);
    }

    res.json(songs);
  } catch (error) {
    console.error("Jamendo API Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};


const toggleLike = async (req, res) => {
  try {
    const { songId } = req.body;
    
    if (!songId || !mongoose.Types.ObjectId.isValid(songId)) {
      return res.status(400).json({ message: "Invalid song ID" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.likedSongs.findIndex(id => id.toString() === songId);

    if (index === -1) {
      user.likedSongs.push(songId);
    } else {
      user.likedSongs.splice(index, 1);
    }

    await user.save();
    
    // Populate to return full song objects
    await user.populate("likedSongs");

    res.json({
      likedSongs: user.likedSongs,
      isLiked: index === -1
    });

  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ 
      message: "Failed to toggle like", 
      error: error.message 
    });
  }
};
// const toggleLike = async (req, res) => {
//   const { songId } = req.body;
//   const user = await User.findById(req.user._id);
//   const index = user.likedSongs.findIndex(id => id.toString() === songId);
  
//   if (index === -1) {
//     user.likedSongs.push(songId);
//   } else {
//     user.likedSongs.splice(index, 1);
//   }
//   await user.save();
//   await user.populate("likedSongs");
//   res.json(user.likedSongs);
// };

const getLikedSongs = async (req, res) => {
  const user = await User.findById(req.user._id).populate("likedSongs");
  res.json(user.likedSongs);
};



//Convert seconds to MM:SS
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export { getSongs, addSong, searchSongs, toggleLike, getLikedSongs, formatDuration };