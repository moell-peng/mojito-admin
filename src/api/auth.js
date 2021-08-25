import http from '@/utils/http'
import config from '@/config'

export const login = ({ username, password }) => {
  return http.post('/api/auth/login', {
    username,
    password,
    guard: config.guard
  })
}

export const logout = () => {
  return http.post('/api/auth/logout')
}