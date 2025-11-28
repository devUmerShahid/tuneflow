// server/models/User.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // FIX: Only define likedSongs ONCE
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  
  recentlyPlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  
  // FIX: Fix typo "Playlists" → "playlists"
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);








// import mongoose from "mongoose";
// import Playlist from "./Playlist.js";

// const userSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
//   recentlyPlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
//   Playlists: [{type: mongoose.Schema.Types.ObjectId, ref:"Playlist"}],
//  // likedSongs: [{type: mongoose.Schema.Types.ObjectId, ref:"Song"}]
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);