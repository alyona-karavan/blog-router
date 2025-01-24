import axios from 'axios'

import { TArticle, TArticlesResponse, TPostArticleData, TArticlePut } from '../types/types'

const API_URL = 'https://blog-platform.kata.academy/api'

export const fetchArticles = async (page = 1): Promise<TArticlesResponse> => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/articles?page=${page}`, {
    params: {
      limit: 5,
      offset: (page - 1) * 5,
    },
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  })
  return {
    articles: response.data.articles,
    articlesCount: response.data.articlesCount,
  }
}

export const fetchArticleBySlug = async (slug: string): Promise<TArticle> => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API_URL}/articles/${slug}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  })
  return response.data.article
}

export const postArticle = async (articleData: TPostArticleData) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${API_URL}/articles`, articleData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const putArticle = async (slug: string, articleData: TArticlePut) => {
  const token = localStorage.getItem('token')
  const response = await axios.put(`${API_URL}/articles/${slug}`, articleData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
