// client/src/pages/LibraryPage.jsx
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../lib/axios'
import Navbar from '../components/Navbar'
import MiniPlayer from '../components/MiniPlayer'
import { Music, Heart, Clock } from 'lucide-react'

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([])
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user) {
      api.get('/playlists').then(res => setPlaylists(res.data))
    }
  }, [user])

  return (
    <div className="min-h-screen bg-dark text-white pb-24">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold mb-10">Your Library</h1>

        <div className="space-y-8">
          {/* Liked Songs */}
          <a href="/liked" className="flex items-center gap-6 p-6 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg hover:opacity-90 transition">
            <Heart size={60} fill="#f9a8d4" className="text-pink-300" />
            <div>
              <h2 className="text-3xl font-bold">Liked Songs</h2>
              <p className="text-gray-300">Your favorite tracks</p>
            </div>
          </a>

          {/* Playlists */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {playlists.map(p => (
                <div key={p._id} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer">
                  <div className="bg-gradient-to-br from-green-600 to-blue-600 aspect-square rounded mb-3" />
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <p className="text-sm text-gray-400">{p.songs?.length || 0} songs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MiniPlayer />
    </div>
  )
}