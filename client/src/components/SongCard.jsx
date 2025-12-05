// client/src/components/SongCard.jsx
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playSong } from '../features/player/playerSlice'
import { Heart, Play, MoreVertical } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'

export default function SongCard({ song, currentSongsList = [] }) {  // optional: pass current list
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [isLiked, setIsLiked] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    if (user?.likedSongs) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLiked(user.likedSongs.some(s => s._id === song._id))
    }
  }, [user, song._id])

  const fetchPlaylists = async () => {
    try {
      const res = await api.get('/playlists')
      setPlaylists(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const toggleLike = async () => {
    if (!user) {
      toast.error("Please login to like songs")
      return
    }

    try {
      await api.post('/songs/like', { songId: song._id })
      setIsLiked(!isLiked)
      toast.success(isLiked ? "Removed from Liked Songs" : "Added to Liked Songs")
    } catch (err) {
      toast.error("Failed to update like", err)
    }
  }

  const addToPlaylist = async (playlistId) => {
    try {
      await api.post('/playlists/add', { playlistId, songId: song._id })
      toast.success("Added to playlist!")
      setIsMenuOpen(false)
    } catch (err) {
      toast.error("Failed to add to playlist", err)
    }
  }

  // FINAL FIX — PLAY BUTTON NOW WORKS
  const handlePlay = () => {
    dispatch(playSong({
      song,
      queue: currentSongsList.length > 0 ? currentSongsList : [song],  // use current list or just this song
      index: currentSongsList.length > 0 
        ? currentSongsList.findIndex(s => s._id === song._id) 
        : 0
    }))
  }

  return (
    <div className="bg-dark-light p-4 rounded-lg hover:bg-gray-800 transition group relative">
      {/* Song Image + Play Button */}
      <div className="relative mb-4">
        <img
          src={song.imageUrl || "/vite.svg"}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button
          onClick={handlePlay}  // ← FIXED
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black bg-opacity-60 rounded-md"
        >
          <Play size={48} fill="#1db954" className="text-white drop-shadow-lg" />
        </button>
      </div>

      {/* Title & Artist */}
      <h3 className="font-semibold text-white truncate">{song.title}</h3>
      <p className="text-sm text-gray-400 truncate">{song.artist}</p>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-3">
        <button onClick={toggleLike} className="transition-all duration-200 hover:scale-110">
          <Heart
            size={22}
            fill={isLiked ? "#1db954" : "none"}
            stroke={isLiked ? "#1db954" : "#fff"}
            className="drop-shadow"
          />
        </button>

        {/* More Options */}
        <div className="relative">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
              if (!isMenuOpen) fetchPlaylists()
            }}
            className="p-1 hover:bg-gray-700 rounded-full transition"
          >
            <MoreVertical size={20} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 bottom-10 w-48 bg-gray-900 rounded-lg shadow-2xl border border-gray-800 z-10 overflow-hidden">
              <div className="py-2">
                {playlists.length === 0 ? (
                  <p className="px-4 py-2 text-gray-500 text-sm">No playlists yet</p>
                ) : (
                  playlists.map(playlist => (
                    <button
                      key={playlist._id}
                      onClick={() => addToPlaylist(playlist._id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 transition text-sm"
                    >
                      {playlist.name}
                    </button>
                  ))
                )}
                <div className="border-t border-gray-800 mt-1 pt-1">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition text-sm text-primary">
                    + Select Your Playlist
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  )
}