import permissionPage from './index.vue'

export default [
  {
    name: 'permissionIndex',
    path: 'permission',
    meta: {
      title: 'permission',
      cache: true,
      permission: 'permission.index'
    },
    component: permissionPage,
  }
]
