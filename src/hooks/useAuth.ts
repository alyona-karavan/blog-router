import { useState, useEffect } from 'react'

import { getCurrentUser } from '../services/api/user'
import { User } from '../services/types/types'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const fetchUserData = async () => {
    try {
      const userData = await getCurrentUser()
      setUser({ ...userData.user })
    } catch (error) {
      console.error('Не удалось получить данные пользователя:', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      fetchUserData()
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    fetchUserData()
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, user, login, logout, fetchUserData }
}

export default useAuth
