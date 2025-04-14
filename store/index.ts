import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import passwordReducer from './passwordReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    password: passwordReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch