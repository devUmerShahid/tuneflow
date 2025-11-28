import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  coverImage:{type:String, default:"https://via.placeholder.com/300?text=Playlist"},
  isPublic: { type: Boolean, default: true },
  coverImage: String
}, { timestamps: true });

export default mongoose.model("Playlist", playlistSchema);