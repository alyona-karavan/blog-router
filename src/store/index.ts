import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import likeReducer from './likeSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    articles: likeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export default store
