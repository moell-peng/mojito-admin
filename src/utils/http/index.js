import axios  from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import config from '@/config'

const httpRequest = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_APP_API_URL
})

httpRequest.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export function setHttpToken(token) {
  httpRequest.defaults.headers.common.Authorization = `Bearer ${token}`
}

httpRequest.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let message = error.response.data.message ? error.response.data.message : error.response.statusText

    if (error.response.status === 422 && Object.prototype.hasOwnProperty.call(error.response.data, 'errors')) {
      message = '';
      for (let key in error.response.data.errors) {
        let items = error.response.data.errors[key]
        if (typeof items === 'string') {
          message += `${items} \n`
        } else {
          error.response.data.errors[key].forEach( item => {
            message += `${item} \n`
          })
        }
      }
    }

    if (error.response.status === 401 && error.response.data.message === 'Unauthenticated.') {
      ElMessage.warning({
        message: "Unauthenticated",
        duration: 1500,
      })
      router.push({name: config.loginRouteName})
    }

    ElMessage.warning({
      message,
      duration: 1500,
    })

    return Promise.reject(error)
  }
)

export default httpRequest
