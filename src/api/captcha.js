import http from '@/utils/http'

export const getCaptcha = () => {
  return http.get('/api/captcha')
}