import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface AuthState {
  loading: boolean
  isAuthenticated: boolean
  success: boolean
  error: string | null
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  success: false,
  error: null,
}

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { username, email, password }: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('http://localhost:3003/api/v1/auth/register', {
        username,
        email,
        password,
      }, { withCredentials: true })

      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3003/api/v1/auth/reset-password', { token, password })
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong')
    }
  }
)

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3003/api/v1/auth/login', {
        email,
        password,
      }, { withCredentials: true })

      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState(state) {
      state.isAuthenticated = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearAuthState } = authSlice.actions
export default authSlice.reducer
