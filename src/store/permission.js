import { loadUserPermissions } from '@/api/permission'
import { defineStore } from "pinia"
import { setPermissions } from '@/utils/localforage'

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    permissions: [],
  }),
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
      setPermissions(permissions)
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