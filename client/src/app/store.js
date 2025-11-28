import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import playerSlice from '../features/player/playerSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    player: playerSlice,
  },
})