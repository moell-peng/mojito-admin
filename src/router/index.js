import { createRouter, createWebHistory } from 'vue-router'
import { getToken, getPermissions } from '@/utils/localforage'
import routes from './routes'
import config from '@/config'
import { ElMessage } from 'element-plus'
import { useAuthStore } from "@/store/auth"


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (config.loginRouteName === to.name) {
    return true
  }

  let token
  try {
    token = await getToken()
  } catch (error) {
    return { name: config.loginRouteName }
  }

  if (!token || !Object.prototype.hasOwnProperty.call(token, 'token')) {
    return { name: config.loginRouteName }
  }

  const authStore = useAuthStore()
  if (!authStore.token) {
    authStore.setToken(token)
  }

  if (to.meta.permission) {
    let permissions
    try {
      permissions = await getPermissions()
    } catch (error) {
      return { name: from.name }
    }

    if (permissions.indexOf(to.meta.permission) < 0) {
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
