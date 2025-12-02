// client/src/pages/LikedSongs.jsx
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../lib/axios'
import SongCard from '../components/SongCard'
import { Heart } from 'lucide-react'

export default function LikedSongs() {
  const [songs, setLikedSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector(s => s.auth)

  // useEffect(() => {
  //   if (!user) {
  //     setLoading(false)
  //     return
  //   }
  //   api.get('/songs/liked')
  //     .then(res => setSongs(res.data))
  //     .finally(() => setLoading(false))
  // }, [user])

  useEffect(() => {
    const fetchLiked = async () => {
      if (!user) {
        setLoading(false)
        return
      }
      try {
        const res = await api.get('/songs/liked')
        setLikedSongs(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLiked()
  }, [user])

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl text-gray-400">PleaseLogin to see your liked songs !!!</p>
    </div>
  )

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex items-end gap-8 mb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <Heart size={50} fill="white" />
        </div>
        <div>
          <p className="text-sm uppercase text-gray-300">Playlist</p>
          <h1 className="text-2xl font-black">Liked Songs</h1>
          <p className="text-xl text-gray-300 mt-4">
            {user.name} • {songs.length} songs
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-2xl py-20">Loading...</p>
      ) : songs.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={100} className="mx-auto text-gray-700 mb-6" />
          <p className="text-3xl">No liked songs yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {songs.map(song => <SongCard key={song._id} song={song} />)}
        </div>
      )}
    </div>
  )
}