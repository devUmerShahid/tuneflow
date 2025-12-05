// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import LikedSongs from './pages/LikedSongs'
import SearchPage from './pages/SearchPage'  // or whatever you call it
import LibraryPage from './pages/LibraryPage'
import PlaylistDetail from './pages/PlaylistDetail'
import AuthPage from './pages/Login'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import MiniPlayer from './components/MiniPlayer'

// Wrapper to conditionally show MiniPlayer
function Layout() {
  const location = useLocation()
  const showMiniPlayer = location.pathname === '/' || 
                         location.pathname.startsWith('/playlist/') ||
                         location.pathname === '/liked' ||
                         location.pathname === '/library' ||
                         location.pathname === '/search'

  return (
    <div className="relative min-h-screen bg-dark text-white">
      <Sidebar />
      
      <div className="lg:ml-72">
        {/* <Navbar /> */}
        <main className={`pb-24 ${showMiniPlayer ? '' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/liked" element={<LikedSongs />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
          </Routes>
        </main>
      </div>

      {/* ONLY SHOW MINI PLAYER ON MUSIC PAGES */}
      {showMiniPlayer && <MiniPlayer />}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}








// // // client/src/App.jsx
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import Home from './pages/Home'
// import LikedSongs from './pages/LikedSongs'
// import SearchPage from './pages/SearchPage'
// import LibraryPage from './pages/LibraryPage'
// import AuthPage from './pages/Login'
// import Sidebar from './components/Sidebar'
// import Navbar from './components/Navbar'
// import MiniPlayer from './components/MiniPlayer'
// import PlaylistDetail from './pages/PlaylistDetail'
// import BrowsePage from './pages/Browse'


// function ProtectedRoute({ children }) {
//   const { user } = useSelector(state => state.auth)
//   return user ? children : <Navigate to="/login" />
// }

// export default function App() {
//   return (
//     <Router>
//       <div className="relative min-h-screen bg-dark text-white">
//         {/* Global Sidebar */}
//         <Sidebar />

//         {/* Main Content Area */}
//         <div className="lg:ml-72">
//           {/* <Navbar /> */}
//           <main className="pb-24">
//             <Routes>
//               <Route path="/login" element={<AuthPage />} />
//               <Route path="/register" element={<AuthPage />} />
//               <Route path="/" element={<Home />} />
//               <Route path="/search" element={<SearchPage />} />
//               <Route path="/liked" element={<LikedSongs />} />
//               <Route path="/library" element={<LibraryPage />} />
//               <Route path="/playlist/:id" element={<PlaylistDetail />} />
//               <Route path="/browse" element={<BrowsePage />} />
//             </Routes>
//           </main>
//         </div>

//         {/* Global Player */}
//         <MiniPlayer />
//       </div>
//     </Router>
//   )
// }