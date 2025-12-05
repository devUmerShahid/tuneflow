// client/src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  PlusCircle,
  Menu,
  X,
  ChevronRight,
  LogIn,
  LogOut
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import CreatePlaylistModal from './CreatePlaylistModal'
import api from '../lib/axios'
import toast from 'react-hot-toast'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [playlists, setPlaylists] = useState([])
  const location = useLocation()
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      api.get('/playlists')
        .then(res => setPlaylists(res.data))
        .catch(() => {})
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaylists([])
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout')
    } catch (err) {
      console.log("Logout failed, continuing...", err)
    }
    dispatch(logout())
    toast.success("Logged out successfully")
    setOpen(false)
  }

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/liked", icon: Heart, label: "Liked Songs" },
    { to: "/library", icon: Library, label: "Your Library" },
  ]

  const displayedPlaylists = playlists.slice(0, 2)

  return (
    <>
      {/* Mobile/Tablet Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-gray-800 rounded-full transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold text-lg">
            T
          </div>
          {/* <h1 className="text-xl font-bold">TuneFlow</h1> */}
          <img src="/tuneflow.png" alt=""  className='h-13 w-45'/>
        </div>

        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Full Sidebar (Desktop + Mobile Drawer) */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-black p-6 transform transition-transform z-60 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col pt-20 lg:pt-6`}>
        {/* Close Button Inside Sidebar (Mobile Only) */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-2 hover:bg-gray-800 rounded-full transition"
        >
          <X size={28} />
        </button>
        {/* Desktop Logo (hidden on mobile since it's in header) */}
        <div className="hidden lg:flex items-center gap-3 mb-12 flex-shrink-0">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold text-xl">
            T
          </div>
          {/* <h1 className="text-2xl font-bold">TuneFlow</h1> */}
          <img src="/tuneflow.png" alt=""  className='h-13 w-45'/>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 mb-10 flex-shrink-0">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 text-lg transition-all duration-200 ${
                location.pathname === item.to 
                  ? 'text-white font-bold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon size={24} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Scrollable Playlists Section */}
        <div className="border-t border-gray-800 pt-6 flex-1 overflow-y-auto min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Your Playlists</h3>
            <button onClick={() => setModalOpen(true)}>
              <PlusCircle size={24} className="text-gray-400 hover:text-white transition" />
            </button>
          </div>

          <div className="space-y-2">
            {displayedPlaylists.length === 0 ? (
              <p className="text-gray-600 text-sm italic">No playlists yet</p>
            ) : (
              displayedPlaylists.map(p => (
                <Link
                  key={p._id}
                  to={`/playlist/${p._id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900 transition group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-xs font-bold shadow-md">
                    {p.name[0].toUpperCase()}
                  </div>
                  <span className="truncate text-sm">{p.name}</span>
                </Link>
              ))
            )}
          </div>

          {playlists.length > 2 && (
            <Link
              to="/library"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between mt-4 p-3 rounded-lg hover:bg-gray-900 transition text-primary font-medium text-sm group"
            >
              <span>See all playlists ({playlists.length})</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
          )}
        </div>

        {/* User Account - Fixed at Bottom */}
        <div className="border-t border-gray-800 pt-6 mt-6 flex-shrink-0">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition p-2"
                title="Logout"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 transition text-white font-medium"
            >
              <LogIn size={24} />
              <span>Log in</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setOpen(false)}
        />
      )}

      <CreatePlaylistModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onCreated={(p) => setPlaylists(prev => [...prev, p])}
      />
    </>
  )
}