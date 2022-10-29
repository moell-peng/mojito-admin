import { login, logout } from '@/api/auth'
import { removeToken, setToken } from '@/utils/localforage'
import { defineStore } from "pinia"
import { setHttpToken } from '@/utils/http'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    'token': '',
  }),
  actions: {
    setToken(token) {
      this.token = token
      setHttpToken(this.token.token)
    },
    loginHandle (data) {
      return new Promise((resolve, reject) => {
        return login(data)
          .then(response => {
            const token = response.data.data

            this.setToken({ token })

            resolve(setToken(token))
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    logoutHandle () {
      return new Promise((resolve, reject) => {
        return logout().then( () => {
          removeToken()
        }).catch( error => {
          reject(error)
        })
      })
    }
  }
})