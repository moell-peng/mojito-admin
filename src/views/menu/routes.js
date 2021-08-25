import menuPage from "./index.vue"

export default [
  {
    name: 'menuIndex',
    path: 'menu',
    meta: {
      title: 'menu',
      cache: true,
      permission: 'menu.index'
    },
    component: menuPage
  }
]
