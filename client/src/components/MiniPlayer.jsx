import { useSelector, useDispatch } from 'react-redux'
import { togglePlay } from '../features/player/playerSlice'
import { Play, Pause } from 'lucide-react'

export default function MiniPlayer() {
  const { currentSong, isPlaying } = useSelector(state => state.player)
  const dispatch = useDispatch()

  if (!currentSong) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={currentSong.imageUrl || "/vite.svg"} alt="" className="w-14 h-14 rounded" />
        <div>
          <h4 className="font-semibold">{currentSong.title}</h4>
          <p className="text-sm text-gray-400">{currentSong.artist}</p>
        </div>
      </div>
      <button
        onClick={() => dispatch(togglePlay())}
        className="bg-white text-black p-3 rounded-full hover:scale-105 transition"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} fill="black" />}
      </button>
      <audio autoPlay src={currentSong.songUrl} />
    </div>
  )
}