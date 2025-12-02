import mongoose from "mongoose";

const songSchema = mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: String,
  genre: String,
  duration: String,
  songUrl: { type: String, required: true },   
  imageUrl: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Song", songSchema);