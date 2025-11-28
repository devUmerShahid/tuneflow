// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import LikedSongs from './pages/LikedSongs'   // ← ADD THIS
import AuthPage from './pages/Login'

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
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        {/* ADD THIS ROUTE */}
        <Route path="/liked" element={
          <ProtectedRoute>
            <LikedSongs />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}









// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import Home from './pages/Home'
// import AuthPage from './pages/Login'  // ← Make sure this import is correct
// import LikedSongs from './pages/LikedSongs'

// function ProtectedRoute({ children }) {
//   const { user } = useSelector(state => state.auth)
//   return user ? children : <Navigate to="/login" />
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<AuthPage />} />
//         <Route path="/register" element={<AuthPage />} />
//         <Route path="/" element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         } />

//         <Route path="/liked" element={
//           <ProtectedRoute>
//             <LikedSongs />
//           </ProtectedRoute>
//         } />
//       </Routes>
//     </Router>
//   )
// }





// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import Home from './pages/Home'
// import AuthPage from './pages/Login' // works for both login & register

// function ProtectedRoute({ children }) {
//   const { user } = useSelector(state => state.auth)
//   return user ? children : <Navigate to="/login" />
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<AuthPage />} />
//         <Route path="/register" element={<AuthPage />} />
//         <Route path="/" element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         } />
//       </Routes>
//     </Router>
//   )
// }