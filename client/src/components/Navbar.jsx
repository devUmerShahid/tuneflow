// client/src/components/Navbar.jsx
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Search, LogOut, User } from 'lucide-react'
import api from '../lib/axios'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout')
    } catch (err) {
      console.log("Logout API failed, continuing...", err)
    }
    dispatch(logout())
    toast.success("Logged out successfully")
    navigate('/')
  }

  return (
    <nav className="bg-dark-light/95 backdrop-blur-sm p-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-800">
      {/* Left: Empty or page title can go here later */}
      <div className="w-40" /> {/* Spacer so content stays centered */}

      {/* Center: Search Icon */}
      <Link 
        to="/search" 
        className="hover:text-primary transition transform hover:scale-110"
        title="Search"
      >
        <Search size={26} />
      </Link>

      {/* Right: User Info */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* User Avatar + Name */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-full">
              <div className="w-9 h-9 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block font-medium">{user.name}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 px-5 py-2.5 rounded-full transition"
            >
              <LogOut size={20} />
              <span className="hidden md:inline font-medium">Logout</span>
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            className="bg-primary hover:bg-green-500 px-8 py-3 rounded-full font-bold transition shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}