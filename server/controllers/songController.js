import Song from "../models/Song.js";

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

export { getSongs, addSong };