import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticles = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/articles`, {
      params: {
        limit: 10, 
        offset: (page - 1) * 10, // Смещение для пагинации
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticleBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${slug}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};