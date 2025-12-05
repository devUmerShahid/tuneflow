// client/src/components/MiniPlayer.jsx
import { useSelector, useDispatch } from 'react-redux'
import { togglePlay, playNext, playPrev } from '../features/player/playerSlice'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useRef, useEffect } from 'react'

export default function MiniPlayer() {
  const { currentSong, isPlaying, queue, currentIndex } = useSelector(state => state.player)
  const dispatch = useDispatch()
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.songUrl
      if (isPlaying) audioRef.current.play().catch(() => {})
      else audioRef.current.pause()
    }
  }, [currentSong, isPlaying])

  if (!currentSong) return null

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < queue.length - 1

  return (
    <div className="fixed bottom-0 left-0 lg:left-72 right-0 bg-gradient-to-t from-black to-gray-900 border-t border-gray-800 z-50">
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
        {/* Left: Song Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img 
            src={currentSong.imageUrl || "/vite.svg"} 
            alt={currentSong.title}
            className="w-14 h-14 rounded-lg shadow-lg object-cover"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-white truncate">{currentSong.title}</h4>
            <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Center: Controls + Wave */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-6">
            <button onClick={() => dispatch(playPrev())} disabled={!hasPrev} className="text-gray-400 hover:text-white transition disabled:opacity-50">
              <SkipBack size={24} />
            </button>

            <button onClick={() => dispatch(togglePlay())} className="bg-white text-black p-4 rounded-full hover:scale-110 transition shadow-xl">
              {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
            </button>

            <button onClick={() => dispatch(playNext())} disabled={!hasNext} className="text-gray-400 hover:text-white transition disabled:opacity-50">
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  )
}