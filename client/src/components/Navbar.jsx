import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Music, Search, LogOut } from 'lucide-react'

export default function Navbar() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <nav className="bg-dark-light p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <Music size={32} className="text-primary" />
        <h1 className="text-2xl font-bold">TuneFlow</h1>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/search" className="hover:text-primary transition"><Search /></Link>
        {user ? (
          <>
            <Link to="/liked" className="hover:text-primary">Liked</Link>
            <button onClick={() => { dispatch(logout()); navigate('/login') }} className="flex items-center gap-2 hover:text-primary">
              <LogOut size={20} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-primary px-6 py-2 rounded-full hover:bg-green-500 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}