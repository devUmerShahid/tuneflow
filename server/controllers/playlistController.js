import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

const createPlaylist = async (req, res) => {
  const { name } = req.body;
  const playlist = await Playlist.create({
    name,
    user: req.user._id,
    coverImage: "https://via.placeholder.com/300?text=" + encodeURIComponent(name)
  });
  await User.findByIdAndUpdate(req.user._id, { $push: { playlists: playlist._id } });
  res.status(201).json(playlist);
};

const getUserPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ user: req.user._id }).populate("songs");
  res.json(playlists);
};

const deletePlaylist = async (req, res) => {
  const { id } = req.params;
  await Playlist.findByIdAndDelete(id);
  await User.findByIdAndUpdate(req.user._id, { $pull: { playlists: id } });
  res.json({ message: "Deleted" });
};

const addToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    await playlist.populate("songs");
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
  // const { playlistId, songId } = req.body;
  // const playlist = await Playlist.findById(playlistId);
  // if (!playlist.songs.includes(songId)) {
  //   playlist.songs.push(songId);
  //   await playlist.save();
  // }
  // await playlist.populate("songs");
  // res.json(playlist);
};

const removeFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  const playlist = await Playlist.findById(playlistId);
  playlist.songs = playlist.songs.filter(s => s.toString() !== songId);
  await playlist.save();
  await playlist.populate("songs");
  res.json(playlist);
};

export { createPlaylist, getUserPlaylists, deletePlaylist, addToPlaylist, removeFromPlaylist };







// import Playlist from "../models/Playlist.js";

// const createPlaylist = async (req, res) => {
//   const { name } = req.body;
//   const playlist = await Playlist.create({
//     name,
//     user: req.user._id,
//   });
//   res.status(201).json(playlist);
// };

// const getUserPlaylists = async (req, res) => {
//   const playlists = await Playlist.find({ user: req.user._id }).populate("songs");
//   res.json(playlists);
// };

// const addSongToPlaylist = async (req, res) => {
//   const { playlistId, songId } = req.body;
//   const playlist = await Playlist.findById(playlistId);
//   if (playlist.user.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }
//   playlist.songs.push(songId);
//   await playlist.save();
//   await playlist.populate("songs");
//   res.json(playlist);
// };

// const removeSongFromPlaylist = async (req, res) => {
//   const { playlistId, songId } = req.body;
//   const playlist = await Playlist.findById(playlistId);
//   if (playlist.user.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: "Not authorized" });
//   }
//   playlist.songs = playlist.songs.filter(s => s.toString() !== songId);
//   await playlist.save();
//   await playlist.populate("songs");
//   res.json(playlist);
// };

// export { createPlaylist, getUserPlaylists, addSongToPlaylist, removeSongFromPlaylist };