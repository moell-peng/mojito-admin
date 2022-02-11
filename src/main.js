import { createApp } from 'vue'
import i18n from '@/lang/index'
import router from '@/router'
import store from '@/store'
import App from './App.vue'
import * as Icons from '@element-plus/icons-vue'
import '@/assets/css/index.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'

const app = createApp(App)

app.use(store)
  .use(router)
  .use(i18n)

for (const iconName in Icons) {
  if (Reflect.has(Icons, iconName)) {
    app.component(iconName, Icons[iconName])
  }
}

app.mount('#app')

