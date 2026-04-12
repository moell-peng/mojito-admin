import { login, logout } from '@/api/auth'
import { defineStore } from "pinia"
import config from '@/config'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
  }),
  persist: {
    key: `token:${config.guard}`,
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    loginHandle(data) {
      return login(data).then(response => {
        this.setToken(response.data.data)
      })
    },
    logoutHandle() {
      return logout().then(() => {
        this.token = null
      })
    }
  }
})