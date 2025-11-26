import Playlist from "../models/Playlist.js";

const createPlaylist = async (req, res) => {
  const { name } = req.body;
  const playlist = await Playlist.create({
    name,
    user: req.user._id,
  });
  res.status(201).json(playlist);
};

const getUserPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ user: req.user._id }).populate("songs");
  res.json(playlists);
};

const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  const playlist = await Playlist.findById(playlistId);
  if (playlist.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  playlist.songs.push(songId);
  await playlist.save();
  await playlist.populate("songs");
  res.json(playlist);
};

const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  const playlist = await Playlist.findById(playlistId);
  if (playlist.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  playlist.songs = playlist.songs.filter(s => s.toString() !== songId);
  await playlist.save();
  await playlist.populate("songs");
  res.json(playlist);
};

export { createPlaylist, getUserPlaylists, addSongToPlaylist, removeSongFromPlaylist };