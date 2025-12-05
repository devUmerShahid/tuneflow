// client/src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../lib/axios'
import SongCard from '../components/SongCard'
import toast from 'react-hot-toast'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SONGS_PER_PAGE = 18

export default function Home() {
  const [songs, setSongs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalSongs, setTotalSongs] = useState(0)
  const { user } = useSelector(state => state.auth)

  const fetchSongs = async (query = '', page = 1) => {
    setLoading(true)
    try {
      const url = query 
        ? `/songs/search?query=${encodeURIComponent(query)}&limit=${SONGS_PER_PAGE}&page=${page}`
        : `/songs?limit=${SONGS_PER_PAGE}&page=${page}`
      
      const res = await api.get(url)
      
      // Adjust based on your API response structure
      setSongs(res.data.songs || res.data)
      setTotalSongs(res.data.total || res.data.length)
    } catch (err) {
      console.error("Fetch songs error:", err)
      toast.error("Failed to load songs")
      setSongs([])
      setTotalSongs(0)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchSongs(searchQuery, 1)
  }

  const totalPages = Math.ceil(totalSongs / SONGS_PER_PAGE)

  useEffect(() => {
    fetchSongs('', 1)
  }, [])

  return (
    <div className="container mx-auto pt-30 px-6 py-10">
      {/* Search Bar */}
      {/* <form onSubmit={handleSearch} className="mb-12 flex gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search i.e, lofi, pop..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-4 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
        />
        <button type="submit" className="bg-primary px-8 py-4 rounded-full font-bold hover:bg-green-500 transition">
          Search
        </button>
      </form> */}
      <form onSubmit={handleSearch} className="mb-12 max-w-2xl mx-auto px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="i.e, lofi, pop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-6 pr-16 py-5 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-lg text-white placeholder-gray-400 transition"
          />
          
          {/* Green Search Button Inside Input */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-400 text-black font-bold px-8 py-3.5 rounded-full transition shadow-lg hover:shadow-primary/50"
          >
            Search
          </button>
        </div>
      </form>

      {/* Title */}
      <h2 className="text-4xl font-bold mb-10">
        {searchQuery 
          ? `Results for "${searchQuery}"` 
          : user 
            ? 'Welcome back!' 
            : 'Discover Music'
        }
      </h2>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-32">
          <div className="inline-block animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
          <p className="text-2xl mt-6 text-gray-400">Loading songs...</p>
        </div>
      ) : songs.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-3xl text-gray-500">No songs found</p>
          <p className="text-gray-600 mt-4">Try searching for "chill", "rock", "pop", "lofi"</p>
        </div>
      ) : (
        <>
          {/* Songs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-16">
            {songs.map(song => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 py-5">
              <button
                onClick={() => {
                  const newPage = currentPage - 1
                  setCurrentPage(newPage)
                  fetchSongs(searchQuery, newPage)
                }}
                disabled={currentPage === 1}
                className={`p-4 rounded-full transition ${
                  currentPage === 1 
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-700 text-white'
                }`}
              >
                <ChevronLeft size={28} />
              </button>

              <span className="text-lg font-medium text-gray-300">
                Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
              </span>

              <button
                onClick={() => {
                  const newPage = currentPage + 1
                  setCurrentPage(newPage)
                  fetchSongs(searchQuery, newPage)
                }}
                disabled={currentPage === totalPages}
                className={`p-4 rounded-full transition ${
                  currentPage === totalPages 
                    ? 'bg-green-300 text-white/20 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-700 text-white'
                }`}
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}









// // client/src/pages/Home.jsx
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import api from '../lib/axios'
// import SongCard from '../components/SongCard'
// import toast from 'react-hot-toast'

// export default function Home() {
//   const [songs, setSongs] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [loading, setLoading] = useState(true)
//   const { user } = useSelector(state => state.auth)

//   // const fetchSongs = async (query = '') => {
//   //   setLoading(true)
//   //   try {
//   //     const url = query 
//   //       ? `/songs/search?query=${encodeURIComponent(query)}&limit=50` 
//   //       : '/songs'
//   //     const res = await api.get(url)
//   //     setSongs(res.data)
//   //   } catch (err) {
//   //     toast.error("Failed to load songs", err)
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }
//   const fetchSongs = async (query = '') => {
//     setLoading(true)
//     try {
//       const url = query 
//         ? `/songs/search?query=${encodeURIComponent(query)}&limit=10` 
//         : '/songs'
//       const res = await api.get(url)
//       setSongs(res.data)
//     } catch (err) {
//       console.error("Fetch songs error:", err)
//       toast.error("Failed to load songs")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     fetchSongs(searchQuery)
//   }

//   useEffect(() => {
//     fetchSongs()
//   }, [])

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <form onSubmit={handleSearch} className="mb-10 flex gap-4 max-w-2xl mx-auto">
//         <input
//           type="text"
//           placeholder="Search songs, artists..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1 p-4 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
//         />
//         <button type="submit" className="bg-primary px-8 py-4 rounded-full font-bold hover:bg-green-500 transition">
//           Search
//         </button>
//       </form>

//       <h2 className="text-4xl font-bold mb-8">
//         {searchQuery ? `Results for "${searchQuery}"` : user ? 'Welcome back!' : 'Discover Music'}
//       </h2>

//       {loading ? (
//         <p className="text-center text-2xl py-20">Loading...</p>
//       ) : songs.length === 0 ? (
//         <p className="text-center text-gray-400 text-xl py-20">No songs found. Try "chill", "rock", "pop"</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//           {songs.map(song => (
//             <SongCard key={song._id} song={song} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }






// // client/src/pages/Home.jsx
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import api from '../lib/axios'
// import SongCard from '../components/SongCard'
// import toast from 'react-hot-toast'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const SONGS_PER_PAGE = 18

// export default function Home() {
//   const [songs, setSongs] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalSongs, setTotalSongs] = useState(0)
//   const { user } = useSelector(state => state.auth)

//   const fetchSongs = async (query = '', page = 1) => {
//     setLoading(true)
//     try {
//       const url = query 
//         ? `/songs/search?query=${encodeURIComponent(query)}&limit=${SONGS_PER_PAGE}&page=${page}`
//         : `/songs?limit=${SONGS_PER_PAGE}&page=${page}`
      
//       const res = await api.get(url)
      
//       // Adjust based on your API response structure
//       setSongs(res.data.songs || res.data)
//       setTotalSongs(res.data.total || res.data.length)
//     } catch (err) {
//       console.error("Fetch songs error:", err)
//       toast.error("Failed to load songs")
//       setSongs([])
//       setTotalSongs(0)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     setCurrentPage(1)
//     fetchSongs(searchQuery, 1)
//   }

//   const totalPages = Math.ceil(totalSongs / SONGS_PER_PAGE)

//   useEffect(() => {
//     fetchSongs('', 1)
//   }, [])

//   return (
//     <div className="container mx-auto px-6 py-10">
//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-12 flex gap-4 max-w-2xl mx-auto">
//         <input
//           type="text"
//           placeholder="Search songs, artists..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1 p-4 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
//         />
//         <button type="submit" className="bg-primary px-8 py-4 rounded-full font-bold hover:bg-green-500 transition">
//           Search
//         </button>
//       </form>

//       {/* Title */}
//       <h2 className="text-4xl font-bold mb-10">
//         {searchQuery 
//           ? `Results for "${searchQuery}"` 
//           : user 
//             ? 'Welcome back!' 
//             : 'Discover Music'
//         }
//       </h2>

//       {/* Loading */}
//       {loading ? (
//         <div className="text-center py-32">
//           <div className="inline-block animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
//           <p className="text-2xl mt-6 text-gray-400">Loading songs...</p>
//         </div>
//       ) : songs.length === 0 ? (
//         <div className="text-center py-32">
//           <p className="text-3xl text-gray-500">No songs found</p>
//           <p className="text-gray-600 mt-4">Try searching for "chill", "rock", "pop", "lofi"</p>
//         </div>
//       ) : (
//         <>
//           {/* Songs Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-16">
//             {songs.map(song => (
//               <SongCard key={song._id} song={song} />
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-6 py-5">
//               <button
//                 onClick={() => {
//                   const newPage = currentPage - 1
//                   setCurrentPage(newPage)
//                   fetchSongs(searchQuery, newPage)
//                 }}
//                 disabled={currentPage === 1}
//                 className={`p-4 rounded-full transition ${
//                   currentPage === 1 
//                     ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
//                     : 'bg-green-500 hover:bg-green-700 text-white'
//                 }`}
//               >
//                 <ChevronLeft size={28} />
//               </button>

//               <span className="text-lg font-medium text-gray-300">
//                 Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
//               </span>

//               <button
//                 onClick={() => {
//                   const newPage = currentPage + 1
//                   setCurrentPage(newPage)
//                   fetchSongs(searchQuery, newPage)
//                 }}
//                 disabled={currentPage === totalPages}
//                 className={`p-4 rounded-full transition ${
//                   currentPage === totalPages 
//                     ? 'bg-green-300 text-white/20 cursor-not-allowed' 
//                     : 'bg-green-500 hover:bg-green-700 text-white'
//                 }`}
//               >
//                 <ChevronRight size={28} />
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }