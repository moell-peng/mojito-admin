import { createApp } from 'vue'
import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import ElementPlus from 'element-plus'
import i18n from '@/lang/index'
import router from '@/router'
import store from '@/store'
import App from './App.vue'


const app = createApp(App)

app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(i18n)

app.mount('#app')

