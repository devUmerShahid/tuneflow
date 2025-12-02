// client/src/pages/PlaylistDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/axios'
import SongCard from '../components/SongCard'
import { ArrowLeft, Clock, Play, Shuffle } from 'lucide-react'

export default function PlaylistDetail() {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/playlists/${id}`)
      .then(res => setPlaylist(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-20 text-2xl">Loading playlist...</div>
  if (!playlist) return <div className="text-center py-20 text-xl text-gray-400">Playlist not found</div>

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Back Button */}
      <Link to="/library" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
        <ArrowLeft size={20} />
        Back to Library
      </Link>

      {/* Header */}
      <div className="flex items-end gap-8 mb-12">
        <div className="w-34 h-34 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl text-5xl font-black">
          {playlist.name[0]}
        </div>
        <div>
          <h1 className="text-2xl font-black ">{playlist.name}</h1>
          <p className="text-xl text-gray-300">
            {playlist.songs?.length || 0} songs
          </p>
          <div className="flex gap-4 mt-2">
            <button className="bg-primary hover:bg-green-500 p-5 rounded-full font-bold text-xl flex items-center gap-3 transition shadow-lg">
              <Play fill="black" /> Play
            </button>
            <button className="border border-gray-600 hover:border-white p-5 rounded-4xl font-bold text-xl transition flex items-center gap-3">
              <Shuffle /> Shuffle
            </button>
          </div>
        </div>
      </div>

      {/* Songs */}
      {playlist.songs?.length === 0 ? (
        <p className="text-center text-gray-400 text-xl py-20">This playlist is empty</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {playlist.songs.map(song => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      )}
    </div>
  )
}