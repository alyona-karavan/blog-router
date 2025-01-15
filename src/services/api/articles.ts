import axios from 'axios'

import { TArticle, ArticlesResponse } from '../types/types'

const API_URL = 'https://blog-platform.kata.academy/api'

export const fetchArticles = async (page = 1): Promise<ArticlesResponse> => {
  const response = await axios.get(`${API_URL}/articles?page=${page}`, {
    params: {
      limit: 5,
      offset: (page - 1) * 5,
    },
  })
  return {
    articles: response.data.articles,
    articlesCount: response.data.articlesCount,
  }
}

export const fetchArticleBySlug = async (slug: string): Promise<TArticle> => {
  const response = await axios.get(`${API_URL}/articles/${slug}`)
  return response.data.article
}
