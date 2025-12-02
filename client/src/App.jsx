// // client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import LikedSongs from './pages/LikedSongs'
import SearchPage from './pages/SearchPage'
import LibraryPage from './pages/LibraryPage'
import AuthPage from './pages/Login'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import MiniPlayer from './components/MiniPlayer'
import { Analytics } from "@vercel/analytics/next"


function ProtectedRoute({ children }) {
  const { user } = useSelector(state => state.auth)
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-dark text-white">
        {/* Global Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="lg:ml-72">
          <Navbar />
          <main className="pb-24">
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/liked" element={<LikedSongs />} />
              <Route path="/library" element={<LibraryPage />} />
            </Routes>
          </main>
        </div>

        {/* Global Player */}
        <MiniPlayer />
        <Analytics />
      </div>
    </Router>
  )
}