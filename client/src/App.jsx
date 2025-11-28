// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import LikedSongs from './pages/LikedSongs'   // ← ADD THIS
import AuthPage from './pages/Login'
import SearchPage from './pages/SearchPage'
import LibraryPage from './pages/LibraryPage'
import { Library, Search } from 'lucide-react'

function ProtectedRoute({ children }) {
  const { user } = useSelector(state => state.auth)
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        
        <Route path="/" element={
          // <ProtectedRoute>
          //   <Home />
          // </ProtectedRoute>
          <Home/>
        } />
        
        {/* ADD THIS ROUTE */}
        <Route path="/liked" element={
          // <ProtectedRoute>
          //   <LikedSongs />
          // </ProtectedRoute>
          <LikedSongs />
        } />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </Router>
  )
}