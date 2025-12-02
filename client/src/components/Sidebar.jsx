// client/src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  PlusCircle,
  Menu,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'
import CreatePlaylistModal from './CreatePlaylistModal'
import api from '../lib/axios'
//import toast from 'react-hot-toast'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [playlists, setPlaylists] = useState([])
  const location = useLocation()

  useEffect(() => {
    api.get('/playlists')
      .then(res => setPlaylists(res.data))
      .catch(() => {})
  }, [])

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/liked", icon: Heart, label: "Liked Songs" },
    { to: "/library", icon: Library, label: "Your Library" },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-20 left-4 z-50 lg:hidden bg-black/80 p-2 rounded-full"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-black p-6 transform transition-transform z-40 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold text-xl">
                T
            </div>
            <h1 className="text-2xl font-bold">TuneFlow</h1>
            </div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold text-xl">T</div>
          <h1 className="text-2xl font-bold">TuneFlow</h1>
        </div>

        <nav className="space-y-6 mb-10">
          {navItems.map(item => (
            <Link
                key={item.to}
                to={item.to}  // ← THIS LINE WAS MISSING
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 text-lg transition-all ${
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

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Playlists</h3>
            <button onClick={() => setModalOpen(true)}>
              <PlusCircle size={24} className="text-gray-400 hover:text-white" />
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {playlists.map(p => (
                <Link
                    key={p._id}
                    to={`/playlist/${p._id}`}

                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-900 transition"
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded flex items-center justify-center text-xs font-bold">
                    {p.name[0]}
                    </div>
                    <span className="truncate">{p.name}</span>
                </Link>
            ))}
          </div>
        </div>
      </aside>

      <CreatePlaylistModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onCreated={(p) => setPlaylists(prev => [...prev, p])}
      />
    </>
  )
}