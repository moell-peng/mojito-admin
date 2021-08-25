import adminUserPage from './index.vue'

export default [
  {
    name: 'adminUserIndex',
    path: 'admin-user',
    meta: {
      title: 'adminUser',
      cache: true,
      permission: 'admin-user.index'
    },
    component: adminUserPage
  },
]
