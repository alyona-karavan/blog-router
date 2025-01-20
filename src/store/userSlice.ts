import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getCurrentUser } from '../services/api/user'
import { UserSlice } from '../services/types/types'

const initialState: UserSlice = {
  isAuthenticated: false,
  user: null,
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await getCurrentUser()
  return response.user
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    })
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
