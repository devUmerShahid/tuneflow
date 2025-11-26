import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  recentlyPlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);