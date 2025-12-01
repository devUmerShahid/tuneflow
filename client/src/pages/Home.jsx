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









// // client/src/pages/Home.jsx
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Menu, X, PlusCircle, Heart, Home as HomeIcon, Search as SearchIcon, Library } from 'lucide-react'
// import api from '../lib/axios'
// import SongCard from '../components/SongCard'
// import Navbar from '../components/Navbar'
// import MiniPlayer from '../components/MiniPlayer'
// import CreatePlaylistModal from '../components/CreatePlaylistModal'
// import toast from 'react-hot-toast'

// export default function Home() {
//   const [songs, setSongs] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [modalOpen, setModalOpen] = useState(false)
//   const [playlists, setPlaylists] = useState([])

//   const { user } = useSelector(state => state.auth)

  // const fetchSongs = async (query = '') => {
  //   setLoading(true)
  //   try {
  //     const url = query 
  //       ? `/songs/search?query=${encodeURIComponent(query)}&limit=50` 
  //       : '/songs'
  //     const res = await api.get(url)
  //     setSongs(res.data)
  //   } catch (err) {
  //     console.error("Fetch songs error:", err)
  //     toast.error("Failed to load songs")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

//   const fetchPlaylists = async () => {
//     try {
//       const res = await api.get('/playlists')
//       setPlaylists(res.data)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     fetchSongs(searchQuery)
//   }

//   const handlePlaylistCreated = (newPlaylist) => {
//     setPlaylists(prev => [...prev, newPlaylist])
//     toast.success("Playlist created!")
//   }

//   useEffect(() => {
//     fetchSongs()
//     if (user) fetchPlaylists()
//   }, [user])

//   return (
//     <div className="min-h-screen bg-dark text-white pb-24">

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="fixed top-4 left-4 z-50 lg:hidden bg-dark-light p-2 rounded-full"
//       >
//         {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
//       </button>

//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 w-72 bg-black p-6 transform transition-transform z-40 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div className="flex items-center gap-3 mb-10">
//           <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold text-xl">
//             T
//           </div>
//           <h1 className="text-2xl font-bold">TuneFlow</h1>
//         </div>

//         <nav className="space-y-6 mb-10">
//           <a href="/" className="flex items-center gap-4 text-lg hover:text-primary transition">
//             <HomeIcon size={24} /> Home
//           </a>
//           <a href="/search" className="flex items-center gap-4 text-lg hover:text-primary transition">
//             <SearchIcon size={24} /> Search
//           </a>
//           <a href="/liked" className="flex items-center gap-4 text-lg hover:text-primary transition">
//             <Heart size={24} /> Liked Songs
//           </a>
//           <a href="/library" className="flex items-center gap-4 text-lg hover:text-primary transition">
//             <Library size={24} /> Your Library
//           </a>
//         </nav>

//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold">Playlists</h3>
//             <button onClick={() => setModalOpen(true)} className="hover:text-primary">
//               <PlusCircle size={24} />
//             </button>
//           </div>
//           <div className="space-y-2 max-h-96 overflow-y-auto">
//             {playlists.length === 0 ? (
//               <p className="text-gray-500 text-sm">No playlists yet</p>
//             ) : (
//               playlists.map(playlist => (
//                 <div key={playlist._id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-900 cursor-pointer">
//                   <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-xs">
//                     {playlist.name[0]}
//                   </div>
//                   <span className="truncate">{playlist.name}</span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="lg:ml-72">
//         <Navbar />
//         <div className="container mx-auto px-6 py-10">
//           <form onSubmit={handleSearch} className="mb-10 flex gap-4 max-w-2xl">
//             <input
//               type="text"
//               placeholder="Search songs, artists..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 p-4 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-white text-lg"
//             />
//             <button type="submit" className="bg-primary px-8 py-4 rounded-full font-bold hover:bg-green-500 transition">
//               Search
//             </button>
//           </form>

//           <h2 className="text-4xl font-bold mb-8">
//             {searchQuery 
//               ? `Results for "${searchQuery}"` 
//               : user 
//                 ? 'Welcome back!' 
//                 : 'Discover Music'
//             }
//           </h2>

//           {loading ? (
//             <p className="text-center text-2xl py-20">Loading songs...</p>
//           ) : songs.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-gray-400 text-xl">No songs found</p>
//               <p className="text-gray-500 mt-2">Try searching for "chill", "rock", "pop"...</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//               {songs.map(song => (
//                 <SongCard key={song._id} song={song} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <MiniPlayer />
//       <CreatePlaylistModal 
//         isOpen={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//         onCreated={handlePlaylistCreated} 
//       />
//     </div>
//   )
// }