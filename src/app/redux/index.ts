import { authReducer } from '@/entities/auth'
import { modalReducer } from '@/entities/modal'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch