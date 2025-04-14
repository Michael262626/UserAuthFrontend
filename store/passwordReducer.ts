import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface PasswordState {
  isLoading: boolean
  successMessage: string | { message: string };
  errorMessage: string | { message: string };
}

const initialState: PasswordState = {
  isLoading: false,
  successMessage: '',
  errorMessage: '',
}

// Forgot password thunk
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3003/api/v1/auth/forgot-password', { email })
      return response.data // success message returned from API
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Password reset failed')
    }
  }
)

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.successMessage = action.payload.message // Assuming API returns a message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload as string // Capture error message from API
      })
  },
})

export default passwordSlice.reducer
