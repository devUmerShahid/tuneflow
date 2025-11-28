import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/axios'

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', userData)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data.message)
  }
})

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', userData)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => { state.isLoading = true; state.error = null }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer