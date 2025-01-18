import axios from 'axios'

import { SignUpData, SignInData, EditProfileData } from '../types/types'

const API_URL = 'https://blog-platform.kata.academy/api'

export const registerUser = async (userData: SignUpData) => {
  const response = await axios.post(`${API_URL}/users`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const loginUser = async (userData: SignInData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })
  return response.data
}

export const updateCurrentUser = async (userData: EditProfileData) => {
  const token = localStorage.getItem('token')
  const response = await axios.put(`${API_URL}/user`, userData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
