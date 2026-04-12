import { loadUserPermissions } from '@/api/permission'
import { defineStore } from "pinia"
import config from '@/config'

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    permissions: [],
  }),
  persist: {
    key: `permissions:${config.guard}`,
  },
  getters: {
    hasPermission: state => permissionName =>{
      return  state.permissions.indexOf(permissionName) >= 0
    }
  },
  actions: {
    hasAnyPermission (permissions) {
      let object = {}
      permissions.forEach(permission => {
        object[permission] = this.permissions.indexOf(permission) >= 0
      })
      return object
    },
    setPermissions (permissions) {
      this.permissions = permissions
    },
    loadPermissions ( ) {
      return loadUserPermissions()
        .then(response => {
          this.setPermissions(response.data.data)
          Promise.resolve()
        })
        .catch( error => {
          Promise.reject(error)
        })
    },
  }
})