import axios from 'axios';
import { TArticle } from '../types/types';

const API_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticles = async (page = 1): Promise<TArticle[]> => {
    const response = await axios.get(`${API_URL}/articles`, {
      params: {
        limit: 10, 
        offset: (page - 1) * 10, // Смещение для пагинации
      },
    });
    return response.data.articles;
};

export const fetchArticleBySlug = async (slug: string): Promise<TArticle> => {
    const response = await axios.get(`${API_URL}/articles/${slug}`);
    return response.data.article;
 
};