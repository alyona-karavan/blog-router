import axios from 'axios'

const API_URL = 'https://blog-platform.kata.academy/api'

export const postLike = async (slug: string) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${API_URL}/articles/${slug}/favorite`,
    {},
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  )
  return response.data
}

export const deleteLike = async (slug: string) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${API_URL}/articles/${slug}/favorite`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })
  return response.data
}
