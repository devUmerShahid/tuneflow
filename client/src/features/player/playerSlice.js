// client/src/features/player/playerSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSong: null,
  queue: [],          // All songs in current playlist/queue
  currentIndex: -1,   // Index of current song in queue
  isPlaying: false,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Play a song with optional queue and index
    playSong: (state, action) => {
      state.currentSong = action.payload.song
      state.queue = action.payload.queue || state.queue
      state.currentIndex = action.payload.index !== undefined 
        ? action.payload.index 
        : state.queue.findIndex(s => s._id === action.payload.song._id)
      state.isPlaying = true
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
    },
    playNext: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1
        state.currentSong = state.queue[state.currentIndex]
        state.isPlaying = true
      }
    },
    playPrev: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1
        state.currentSong = state.queue[state.currentIndex]
        state.isPlaying = true
      }
    },
    setQueue: (state, action) => {
      state.queue = action.payload.queue
      state.currentIndex = action.payload.index || 0
      state.currentSong = state.queue[state.currentIndex]
      state.isPlaying = true
    },
    // Optional: stop playback
    stopPlayback: (state) => {
      state.currentSong = null
      state.isPlaying = false
    }
  }
})

export const { 
  playSong, 
  togglePlay, 
  playNext, 
  playPrev, 
  setQueue, 
  stopPlayback 
} = playerSlice.actions

export default playerSlice.reducer





// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   currentSong: null,
//   queue: [],
//   isPlaying: false,
// }

// const playerSlice = createSlice({
//   name: 'player',
//   initialState,
//   reducers: {
//     playSong: (state, action) => {
//       state.currentSong = action.payload
//       state.isPlaying = true
//     },
//     togglePlay: (state) => {
//       state.isPlaying = !state.isPlaying
//     },
//     setQueue: (state, action) => {
//       state.queue = action.payload
//     }
//   }
// })

// export const { playSong, togglePlay, setQueue } = playerSlice.actions
// export default playerSlice.reducer