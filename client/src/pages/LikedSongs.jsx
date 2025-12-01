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









// // client/src/pages/LikedSongs.jsx
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import api from '../lib/axios'
// import SongCard from '../components/SongCard'
// import Navbar from '../components/Navbar'
// import MiniPlayer from '../components/MiniPlayer'
// import { Heart, PersonStanding, PersonStandingIcon, SpeakerIcon, User } from 'lucide-react'

// export default function LikedSongs() {
//   const [likedSongs, setLikedSongs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { user } = useSelector(state => state.auth)

//   useEffect(() => {
//     const fetchLiked = async () => {
//       if (!user) {
//         setLoading(false)
//         return
//       }
//       try {
//         const res = await api.get('/songs/liked')
//         setLikedSongs(res.data)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchLiked()
//   }, [user])

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-dark flex items-center justify-center">
//         <p className="text-xl text-gray-400">Please login to see your liked songs</p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-dark text-white pb-24">
//       <Navbar />
//       <div className="container mx-auto px-6 py-10">
//         {/* Header */}
//         {/* <div className="flex items-end gap-6 mb-10">
//           <div className="w-30 h-30 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-2xl">
//             <Heart size={70} fill="white" className="text-white" />
//           </div>
//           <div>
//             <p className="text-sm uppercase text-gray-300">Playlist</p>
//             <h1 className="text-4xl font-bold mb-6">Liked Songs</h1>
//             <p className="text-lg text-gray-300">
//              <User size={20} fill="white" /> { user.name} • {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
//             </p>
//           </div>          
//         </div> */}


//         <div className="flex items-end gap-6 mb-10">
//   <div className="w-28 h-28 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-2xl">
//     <Heart size={60} fill="white" className="text-white" />
//   </div>

//   <div className="flex flex-col justify-end">
//     <p className="text-sm uppercase text-gray-300 tracking-wider">Playlist</p>
//     <h1 className="text-4xl font-bold leading-none">Liked Songs</h1>

//     {/* ONE LINE: User icon + name + song count */}
//     <div className="flex items-center gap-3 mt-4 text-gray-300">
//       <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
//         {/* You can replace this with actual avatar later */}
//         {/* <span className="text-xs font-bold text-black">
//           {user.name.charAt(0).toUpperCase()}
//         </span> */}
//         <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
//      alt={user.name} 
//      className="w-full h-full object-cover" />
//       </div>
//       <span className="font-semibold">{user.name}</span>
//       <span className="text-gray-500">•</span>
//       <span className="text-sm">
//         {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
//       </span>
//     </div>
//   </div>
// </div>

//         {/* Songs Grid */}
//         {loading ? (
//           <p className="text-center text-2xl py-20">Loading your favorite songs...</p>
//         ) : likedSongs.length === 0 ? (
//           <div className="text-center py-20">
//             <Heart size={80} className="mx-auto text-gray-700 mb-6" />
//             <p className="text-2xl text-gray-400">No liked songs yet</p>
//             <p className="text-gray-500 mt-2">Start liking songs to see them here!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//             {likedSongs.map(song => (
//               <SongCard key={song._id} song={song} />
//             ))}
//           </div>
//         )}
//       </div>
//       <MiniPlayer />
//     </div>
//   )
// }