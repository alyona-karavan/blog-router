/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchArticles, fetchArticleBySlug } from '../services/api/articles'
import { TInitialLikeSlice } from '../services/types/types'

const initialState: TInitialLikeSlice = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  currentArticle: null,
}

export const fetchUserLike = createAsyncThunk('user/fetchUserLike', async (currentPage: number) => {
  const response = await fetchArticles(currentPage)
  return response
})

export const fetchCurrentArticle = createAsyncThunk('user/fetchCurrentArticle', async (slug: string) => {
  const response = await fetchArticleBySlug(slug)
  return response
})
const likeSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setCurrentArticle(state, action) {
      state.currentArticle = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLike.fulfilled, (state, action) => {
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    }),
    builder.addCase(fetchCurrentArticle.fulfilled, (state, action) => {
      state.currentArticle = action.payload
    })
  },
})

export const { setArticles, setCurrentPage, setCurrentArticle } = likeSlice.actions
export default likeSlice.reducer
