import config from '@/config'
import { defineStore } from "pinia"

export const useAppStore = defineStore("app", {
  state: () => ({
    locale: config.locale,
  }),
  actions: {
    setLocale (locale) {
      this.locale = locale
    }
  }
})