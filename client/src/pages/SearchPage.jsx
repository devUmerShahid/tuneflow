// client/src/pages/SearchPage.jsx
import { useState } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import MiniPlayer from '../components/MiniPlayer'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-dark text-white pb-24">
      {/* <Navbar /> */}
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-6xl font-bold mb-12">Search</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search size={28} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to listen to?"
              className="w-full pl-16 pr-6 py-6 text-2xl bg-gray-900 rounded-full focus:outline-none focus:ring-4 focus:ring-primary/50"
              autoFocus
            />
          </div>

          {!query && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Browse all</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Pop', 'Rock', 'Hip Hop', 'Chill', 'Electronic', 'Lo-fi', 'Jazz', 'Classical'].map(genre => (
                  <button
                    key={genre}
                    onClick={() => setQuery(genre)}
                    className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-lg text-2xl font-bold hover:scale-105 transition"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <MiniPlayer />
    </div>
  )
}