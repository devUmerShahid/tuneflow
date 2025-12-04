// client/src/pages/BrowsePage.jsx
import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import api from '../lib/axios'
import SongCard from '../components/SongCard'
import toast from 'react-hot-toast'

const categories = [
  { name: "Chill", query: "chill", gradient: "from-purple-600 to-blue-600" },
  { name: "Electronic", query: "electronic", gradient: "from-cyan-500 to-blue-700" },
  { name: "Lo-fi", query: "lofi", gradient: "from-pink-500 to-rose-600" },
  { name: "Pop", query: "pop", gradient: "from-green-500 to-emerald-600" },
  { name: "Rock", query: "rock", gradient: "from-red-600 to-orange-700" },
  { name: "Jazz", query: "jazz", gradient: "from-amber-600 to-yellow-700" },
  { name: "Classical", query: "classical", gradient: "from-gray-600 to-slate-800" },
  { name: "Hip Hop", query: "hip hop", gradient: "from-indigo-600 to-purple-700" },
]

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  //const navigate = useNavigate()

  const loadCategory = async (query, name) => {
    setSelectedCategory(name)
    setLoading(true)
    try {
      const res = await api.get(`/songs/search?query=${encodeURIComponent(query)}&limit=20`)
      setSongs(res.data)
    } catch (err) {
      toast.error("Failed to load songs", err)
      setSongs([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-dark to-black">
      {/* Hero Header */}
      <div className="px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent mb-6">
          Browse All
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          Discover new music by mood, genre, and vibe
        </p>
      </div>

      {/* Category Grid */}
      <div className="px-6 pb-32">
        {!selectedCategory ? (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => loadCategory(cat.query, cat.name)}
                  className={`relative overflow-hidden rounded-2xl p-8 md:p-12 group transition-all duration-500 hover:scale-105 shadow-2xl`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`} />
                  <div className="relative z-10">
                    <h2 className="text-xl md:text-xl font-black text-white drop-shadow-xl">
                      {cat.name}
                    </h2>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-black/30 rounded-full blur-3xl group-hover:blur-2xl transition" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Back Button + Title */}
            <div className="flex items-center gap-6 mb-12">
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSongs([])
                }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-bold transition flex items-center gap-3"
              >
                ← Back to Categories
              </button>
              <h2 className="text-xl md:text-xl font-black bg-green-500 hover:bg-green-400 px-6 py-3 rounded-full">{selectedCategory}</h2>
            </div>

            {/* Songs */}
            {loading ? (
              <div className="text-center py-32">
                <div className="inline-block animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
                <p className="text-2xl mt-6 text-gray-400">Loading the vibe...</p>
              </div>
            ) : songs.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-3xl text-gray-500">No songs found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {songs.map(song => (
                  <SongCard key={song._id} song={song} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}









// // client/src/pages/SearchPage.jsx
// import { useState } from 'react'
// import { Search } from 'lucide-react'
// import Navbar from '../components/Navbar'
// import MiniPlayer from '../components/MiniPlayer'

// export default function SearchPage() {
//   const [query, setQuery] = useState('')

//   return (
//     <div className="min-h-screen bg-dark text-white pb-24">
//       {/* <Navbar /> */}
//       <div className="container mx-auto px-6 py-20">
//         <h1 className="text-6xl font-bold mb-12">Search</h1>
        
//         <div className="max-w-2xl mx-auto">
//           <div className="relative">
//             <Search size={28} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="What do you want to listen to?"
//               className="w-full pl-16 pr-6 py-6 text-2xl bg-gray-900 rounded-full focus:outline-none focus:ring-4 focus:ring-primary/50"
//               autoFocus
//             />
//           </div>

//           {!query && (
//             <div className="mt-16">
//               <h2 className="text-2xl font-bold mb-6">Browse all</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 {['Pop', 'Rock', 'Hip Hop', 'Chill', 'Electronic', 'Lo-fi', 'Jazz', 'Classical'].map(genre => (
//                   <button
//                     key={genre}
//                     onClick={() => setQuery(genre)}
//                     className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-lg text-2xl font-bold hover:scale-105 transition"
//                   >
//                     {genre}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <MiniPlayer />
//     </div>
//   )
// }