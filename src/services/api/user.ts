import axios from 'axios'

import { UserData } from '../types/types'

const API_URL = 'https://blog-platform.kata.academy/api'

export const registerUser = async (userData: UserData) => {
  const response = await axios.post(`${API_URL}/users`, userData)
  return response.data
}

export const loginUser = async (userData: UserData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData)
  return response.data
}
