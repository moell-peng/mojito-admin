import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh_cn'
import config from '@/config'

const messages = {
  'en': {
    ...en,
  },
  'zh-cn': {
    ...zh,
  }
}


export default createI18n({
  locale: config.locale,
  fallbackLocale: 'en',
  messages
})
