'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  id: string
  email: string
  firstName: string
  lastName?: string
  role: 'GUEST' | 'USER' | 'TRAINER' | 'LOCATION_MANAGER' | 'ADMIN'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  updateUser: (data: Partial<User>) => void
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName?: string
  role?: 'USER' | 'TRAINER'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin.replace(':3000', ':3001') : 'http://localhost:3001')

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Проверяем сохранённую сессию
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка входа')
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, data)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка регистрации')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data })
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, register, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

