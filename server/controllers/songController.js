// server/controllers/songController.js
import Song from "../models/Song.js";
import axios from "axios";
import User from "../models/User.js";
import mongoose from "mongoose";

const ITEMS_PER_PAGE = 12; // Matches frontend

// GET ALL SONGS WITH PAGINATION
const getSongs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || ITEMS_PER_PAGE;
    const skip = (page - 1) * limit;

    const total = await Song.countDocuments();
    const songs = await Song.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      songs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    });
  } catch (error) {
    console.error("Get songs error:", error);
    res.status(500).json({ message: "Failed to fetch songs" });
  }
};

// ADD SONG (protected)
const addSong = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Add song error:", error);
    res.status(500).json({ message: "Failed to add song" });
  }
};

// SEARCH SONGS FROM JAMENDO WITH PAGINATION
const searchSongs = async (req, res) => {
  try {
    const { query = "chill", limit = ITEMS_PER_PAGE, page = 1 } = req.query;
    const searchTerm = query.trim() || "chill";
    const CLIENT_ID = process.env.JAMENDO_CLIENT_ID || "dfd4e2b6";

    const params = {
      client_id: CLIENT_ID,
      format: "json",
      limit: 100, // Get more from Jamendo (we'll paginate client-side)
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
      return res.json({
        songs: [],
        total: 0,
        page: parseInt(page),
        totalPages: 0
      });
    }

    // Save to DB + deduplicate
    const savedSongs = [];
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
          imageUrl: track.album_image || track.image || "https://via.placeholder.com/300",
          jamendoId: track.id,
        });
      }
      savedSongs.push(song);
    }

    // Client-side pagination (since Jamendo doesn't support offset)
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    const paginatedSongs = savedSongs.slice(start, end);

    res.json({
      songs: paginatedSongs,
      total: savedSongs.length,
      page: pageNum,
      totalPages: Math.ceil(savedSongs.length / limitNum),
      hasNext: end < savedSongs.length,
      hasPrev: pageNum > 1
    });
  } catch (error) {
    console.error("Jamendo API Error:", error.response?.data || error.message);
    res.status(500).json({ 
      message: "Search failed", 
      error: error.message 
    });
  }
};

// TOGGLE LIKE
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

// GET LIKED SONGS
const getLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("likedSongs");
    res.json(user.likedSongs || []);
  } catch (error) {
    console.error("Get liked songs error:", error);
    res.status(500).json({ message: "Failed to get liked songs" });
  }
};

// FORMAT DURATION
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export { 
  getSongs, 
  addSong, 
  searchSongs, 
  toggleLike, 
  getLikedSongs, 
  formatDuration 
};









// import Song from "../models/Song.js";
// import axios from "axios";
// import User from "../models/User.js";
// import mongoose from "mongoose";
// //import User from "../models/User.js";

// const getSongs = async (req, res) => {
//   const songs = await Song.find().sort({ createdAt: -1 });
//   res.json(songs);
// };

// const addSong = async (req, res) => {
//   const { title, artist, album, genre, duration, songUrl, imageUrl } = req.body;
//   const song = await Song.create({
//     title,
//     artist,
//     album,
//     genre,
//     duration,
//     songUrl,
//     imageUrl,
//     uploadedBy: req.user._id,
//   });
//   res.status(201).json(song);
// };

// //Search songs from Jamendo
// const searchSongs = async (req, res) => {
//   try {
//     const { query = "chill", limit = 12 } = req.query;
//     const searchTerm = query.trim() || "chill";

//     // YOUR OWN CLIENT ID — NOW WORKS!
//     const CLIENT_ID = process.env.JAMENDO_CLIENT_ID || "dfd4e2b6";

//     const params = {
//       client_id: CLIENT_ID,
//       format: "json",
//       limit: limit,
//       search: searchTerm,
//       include: "musicinfo",
//       audioformat: "mp32",
//       order: "popularity_week"
//     };

//     console.log("Searching Jamendo for:", searchTerm);

//     const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", { params });

//     const tracks = response.data.results || [];

//     console.log(`Jamendo returned ${tracks.length} tracks`);

//     if (tracks.length === 0) {
//       return res.json([]);
//     }

//     const songs = [];
//     for (const track of tracks) {
//       let song = await Song.findOne({ jamendoId: track.id });

//       if (!song) {
//         song = await Song.create({
//           title: track.name,
//           artist: track.artist_name,
//           album: track.album_name || "Single",
//           genre: track.musicinfo?.tags?.genres?.join(", ") || "Unknown",
//           duration: formatDuration(track.duration),
//           songUrl: track.audio,
//           imageUrl: track.album_image || track.image,
//           jamendoId: track.id,
//         });
//       }
//       songs.push(song);
//     }

//     res.json(songs);
//   } catch (error) {
//     console.error("Jamendo API Error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Search failed", error: error.message });
//   }
// };


// const toggleLike = async (req, res) => {
//   try {
//     const { songId } = req.body;
    
//     if (!songId || !mongoose.Types.ObjectId.isValid(songId)) {
//       return res.status(400).json({ message: "Invalid song ID" });
//     }

//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const index = user.likedSongs.findIndex(id => id.toString() === songId);

//     if (index === -1) {
//       user.likedSongs.push(songId);
//     } else {
//       user.likedSongs.splice(index, 1);
//     }

//     await user.save();
    
//     // Populate to return full song objects
//     await user.populate("likedSongs");

//     res.json({
//       likedSongs: user.likedSongs,
//       isLiked: index === -1
//     });

//   } catch (error) {
//     console.error("Toggle like error:", error);
//     res.status(500).json({ 
//       message: "Failed to toggle like", 
//       error: error.message 
//     });
//   }
// };
// // const toggleLike = async (req, res) => {
// //   const { songId } = req.body;
// //   const user = await User.findById(req.user._id);
// //   const index = user.likedSongs.findIndex(id => id.toString() === songId);
  
// //   if (index === -1) {
// //     user.likedSongs.push(songId);
// //   } else {
// //     user.likedSongs.splice(index, 1);
// //   }
// //   await user.save();
// //   await user.populate("likedSongs");
// //   res.json(user.likedSongs);
// // };

// const getLikedSongs = async (req, res) => {
//   const user = await User.findById(req.user._id).populate("likedSongs");
//   res.json(user.likedSongs);
// };



// //Convert seconds to MM:SS
// const formatDuration = (seconds) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${mins}:${secs.toString().padStart(2, '0')}`;
// };

// export { getSongs, addSong, searchSongs, toggleLike, getLikedSongs, formatDuration };