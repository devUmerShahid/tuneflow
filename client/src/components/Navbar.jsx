// client/src/components/Navbar.jsx
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Music, Search, LogOut, User } from 'lucide-react'
import api from '../lib/axios'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Call backend to clear httpOnly cookie
      await api.get('/auth/logout')
    } catch (err) {
      // Even if API fails, we still want to log out client-side
      console.log("Logout API failed, continuing client-side logout", err)
    }

    // Clear Redux state
    dispatch(logout())

    // Show success message
    toast.success("Logged out successfully")

    // Redirect to login
    navigate('/login')
  }

  return (
    <nav className="bg-dark-light/95 backdrop-blur-sm p-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-800">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Music size={24} className="text-black" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
          TuneFlow
        </h1>
      </Link>

      <div className="flex items-center gap-8">
        {/* Search Icon Links */}
        <Link 
          to="/search" 
          className="hover:text-primary transition transform hover:scale-110"
          title="Search"
        >
          <Search size={24} />
        </Link>

        {user ? (
          <div className="flex items-center gap-6">
            {/* Liked Songs */}
            <Link 
              to="/liked" 
              className="hover:text-primary transition flex items-center gap-2"
            >
              <Heart size={22} />
              <span className="hidden md:inline">Liked</span>
            </Link>

            {/* User Avatar + Name */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block text-sm font-medium">{user.name}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 px-4 py-2 rounded-full transition transform hover:scale-105"
              title="Logout"
            >
              <LogOut size={20} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-primary hover:bg-green-500 px-8 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}








// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from '../features/auth/authSlice'
// import { Link, useNavigate } from 'react-router-dom'
// import { Music, Search, LogOut } from 'lucide-react'


// export default function Navbar() {
//   const { user } = useSelector(state => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   return (
//     <nav className="bg-dark-light p-4 flex justify-between items-center">
//       <Link to="/" className="flex items-center gap-2">
//         <Music size={32} className="text-primary" />
//         <h1 className="text-2xl font-bold">TuneFlow</h1>
//       </Link>
//       <div className="flex items-center gap-6">
//         <Link to="/search" className="hover:text-primary transition"><Search /></Link>
//         {user ? (
//           <>
//             <Link to="/liked" className="hover:text-primary">Liked</Link>
//             <button onClick={() => { dispatch(logout()); navigate('/login') }} className="flex items-center gap-2 hover:text-primary">
//               <LogOut size={20} /> Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/login" className="bg-primary px-6 py-2 rounded-full hover:bg-green-500 transition">
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   )
// }