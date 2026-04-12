import config from '@/config'
import { defineStore } from "pinia"

export const useAppStore = defineStore("app", {
  state: () => ({
    locale: config.locale,
  }),
  persist: {
    key: `locale:${config.guard}`,
  },
  actions: {
    setLocale (locale) {
      this.locale = locale
    }
  }
})