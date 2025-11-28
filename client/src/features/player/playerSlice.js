import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSong: null,
  queue: [],
  isPlaying: false,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload
      state.isPlaying = true
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
    },
    setQueue: (state, action) => {
      state.queue = action.payload
    }
  }
})

export const { playSong, togglePlay, setQueue } = playerSlice.actions
export default playerSlice.reducer