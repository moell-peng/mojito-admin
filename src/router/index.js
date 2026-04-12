import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import config from '@/config'
import { ElMessage } from 'element-plus'
import { useAuthStore } from "@/store/auth"
import { usePermissionStore } from "@/store/permission"


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (config.loginRouteName === to.name) {
    return true
  }

  const authStore = useAuthStore()
  const token = authStore.token

  if (!token || !Object.prototype.hasOwnProperty.call(token, 'token')) {
    return { name: config.loginRouteName }
  }

  if (to.meta.permission) {
    const permissionStore = usePermissionStore()
    if (permissionStore.permissions.indexOf(to.meta.permission) < 0) {
      ElMessage({
        message: `You do not have permission to access ${to.meta.permission}`,
        type: 'error'
      })
      return { name: from.name }
    }
  }

  return true
})

export default router
