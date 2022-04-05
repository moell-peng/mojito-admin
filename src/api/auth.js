import http from '@/utils/http'
import config from '@/config'

export const login = (data) => {
  return http.post('/api/auth/login', {
    guard: config.guard, ...data,
  })
}

export const logout = () => {
  return http.post('/api/auth/logout')
}