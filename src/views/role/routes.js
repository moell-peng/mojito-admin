import RolePage from './index.vue'

export default [
  {
    path: 'role',
    name: 'roleIndex',
    meta: {
      title: 'role',
      cache: true,
      permission: 'role.index',
    },
    component: RolePage,
  },
]
