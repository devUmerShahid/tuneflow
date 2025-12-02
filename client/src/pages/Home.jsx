// client/src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../lib/axios'
import SongCard from '../components/SongCard'
import toast from 'react-hot-toast'

export default function Home() {
  const [songs, setSongs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useSelector(state => state.auth)

  // const fetchSongs = async (query = '') => {
  //   setLoading(true)
  //   try {
  //     const url = query 
  //       ? `/songs/search?query=${encodeURIComponent(query)}&limit=50` 
  //       : '/songs'
  //     const res = await api.get(url)
  //     setSongs(res.data)
  //   } catch (err) {
  //     toast.error("Failed to load songs", err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const fetchSongs = async (query = '') => {
    setLoading(true)
    try {
      const url = query 
        ? `/songs/search?query=${encodeURIComponent(query)}&limit=10` 
        : '/songs'
      const res = await api.get(url)
      setSongs(res.data)
    } catch (err) {
      console.error("Fetch songs error:", err)
      toast.error("Failed to load songs")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchSongs(searchQuery)
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  return (
    <div className="container mx-auto px-6 py-10">
      <form onSubmit={handleSearch} className="mb-10 flex gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-4 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
        />
        <button type="submit" className="bg-primary px-8 py-4 rounded-full font-bold hover:bg-green-500 transition">
          Search
        </button>
      </form>

      <h2 className="text-4xl font-bold mb-8">
        {searchQuery ? `Results for "${searchQuery}"` : user ? 'Welcome back!' : 'Discover Music'}
      </h2>

      {loading ? (
        <p className="text-center text-2xl py-20">Loading...</p>
      ) : songs.length === 0 ? (
        <p className="text-center text-gray-400 text-xl py-20">No songs found. Try "chill", "rock", "pop"</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {songs.map(song => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      )}
    </div>
  )
}