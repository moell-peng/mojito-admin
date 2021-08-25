import { createRouter, createWebHistory } from 'vue-router'
import { getToken, getPermissions } from '@/utils/localforage'
import routes from './routes'
import config from '@/config'
import store from '@/store'
import { ElMessage } from 'element-plus'


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (config.loginRouteName === to.name) {
    next()
  } else {
    let login = new Promise((resolve, reject) => {
      getToken().then( token => {
        if (!token || !token.hasOwnProperty('token')) {
          reject({ name : config.loginRouteName})
        } else {
          if (!store.getters.token) {
            store.commit('SET_TOKEN', {token})
          }
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })

    let permission = new Promise((resolve, reject) => {
      if (!to.meta.permission) {
        resolve()
      } else {
        getPermissions().then( permissions => {
          if (permissions.indexOf(to.meta.permission) < 0) {
            reject(`You do not have permission to access ${to.meta.permission}`)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })

    Promise.all([login, permission]).then( result => {
      next()
    }).catch( error => {
      let varType = typeof error;
      if (varType === 'object') {
        next({name: error.name})
      } else {
        ElMessage({
          message: error,
          type: 'error'
        })
        next({name: from.name})
      }
    })
  }
})

export default router
