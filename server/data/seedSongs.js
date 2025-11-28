import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Song from "../models/Song.js";

dotenv.config();
connectDB();

const songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Synthwave",
    duration: "3:20",
    songUrl: "https://cdn.pixabay.com/download/audio/2022/08/26/audio_8c1d1d9a1a.mp3?filename=blinding-lights-11309.mp3",
    imageUrl: "https://i.imgur.com/7b9Q1nB.jpeg"
  },
  {
  "title": "Levitating",
  "artist": "Dua Lipa",
  "album": "Future Nostalgia",
  "genre": "Pop",
  "duration": "3:23",
  "songUrl": "https://cdn.pixabay.com/download/audio/2023/03/24/audio_9b5d07e26a.mp3?filename=levitating-144872.mp3",
  "imageUrl": "https://i.imgur.com/CqYq2Xs.jpeg"
},
   {
  "title": "Levitating",
  "artist": "Dua Lipa",
  "album": "Future Nostalgia",
  "genre": "Pop",
  "duration": "3:23",
  "songUrl": "https://cdn.pixabay.com/download/audio/2023/03/24/audio_9b5d07e26a.mp3?filename=levitating-144872.mp3",
  "imageUrl": "https://i.imgur.com/CqYq2Xs.jpeg"
},
{
  "title": "Good 4 U",
  "artist": "Olivia Rodrigo",
  "album": "SOUR",
  "genre": "Pop Punk",
  "duration": "2:58",
  "songUrl": "https://cdn.pixabay.com/download/audio/2023/08/09/audio_2d5f8f8e2e.mp3?filename=good-4-u-161113.mp3",
  "imageUrl": "https://i.imgur.com/0pZ2K6O.jpeg"
},
{
  "title": "Stay",
  "artist": "The Kid LAROI & Justin Bieber",
  "album": "F*CK LOVE 3",
  "genre": "Pop",
  "duration": "2:21",
  "songUrl": "https://cdn.pixabay.com/download/audio/2022/05/16/audio_2d2d1e6d78.mp3?filename=stay-108664.mp3",
  "imageUrl": "https://i.imgur.com/9kG5j8L.jpeg"
},
{
  "title": "Peaches",
  "artist": "Justin Bieber",
  "album": "Justice",
  "genre": "R&B",
  "duration": "3:18",
  "songUrl": "https://cdn.pixabay.com/download/audio/2023/01/26/audio_2f8e8d8c8f.mp3?filename=peaches-138843.mp3",
  "imageUrl": "https://i.imgur.com/Z8s5m7P.jpeg"
},{
  "title": "Heat Waves",
  "artist": "Glass Animals",
  "album": "Dreamland",
  "genre": "Indie",
  "duration": "3:58",
  "songUrl": "https://cdn.pixabay.com/download/audio/2022/11/03/audio_2d8e8d8c8f.mp3?filename=heat-waves-126488.mp3",
  "imageUrl": "https://i.imgur.com/5t5m7Pq.jpeg"
}
];

const seed = async () => {
  await Song.deleteMany({});
  await Song.insertMany(songs);
  console.log("6 songs seeded!");
  process.exit();
};

seed();