// client/src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/axios'

// Check if user is already logged in (cookie exists)
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/me')  // We’ll create this endpoint
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Not authenticated')
  }
})

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
      state.user = null;
      state.error= null;
    },

    clearAuth:()=>({user: null, isLoading:false, error:null})
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
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
          state.error = null
        }
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

export const { logout, clearAuth } = authSlice.actions
export default authSlice.reducer;