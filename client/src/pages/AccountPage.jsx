// client/src/pages/AccountPage.jsx
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { LogOut, User, Mail, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AccountPage() {
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
    navigate('/login')
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return
    }

    try {
      await api.delete('/auth/delete')  // You'll need to create this backend route
      dispatch(logout())
      toast.success("Account deleted successfully")
      navigate('/login')
    } catch (err) {
      toast.error("Failed to delete account", err)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <p className="text-xl text-gray-400">Please login to view your account</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-dark to-black">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <h1 className="text-2xl md:text-2xl font-black mb-16 text-center text-white/100 bg-clip-text text-transparent">
          My Account
        </h1>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-600 to-white-100 p-12 text-center">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 text-6xl font-black border-4 border-white/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{user.name}</h2>
            <p className="text-xl text-white/80">TuneFlow Member</p>
          </div>

          {/* Account Details */}
          <div className="p-8 space-y-8">
            <div className="flex items-center gap-6 p-6 bg-gray-800/50 rounded-2xl">
              <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center">
                <User size={28} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-xl font-semibold text-white">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-gray-800/50 rounded-2xl">
              <div className="w-14 h-14 bg-green-600/20 rounded-full flex items-center justify-center">
                <Mail size={28} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Email Address</p>
                <p className="text-xl font-semibold text-white">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 border-t border-gray-800 space-y-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-5 rounded-2xl transition shadow-lg"
            >
              <LogOut size={24} />
              Log Out
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-center gap-4 bg-red-900/50 hover:bg-red-900/70 text-red-400 font-bold py-5 rounded-2xl transition border border-red-800/50"
            >
              <Trash2 size={24} />
              Delete Account
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-12 text-sm">
          © 2025 TuneFlow • All rights reserved
        </p>
      </div>
    </div>
  )
}