import MainPage from '@/views/main/index.vue'
import dashboard from '@/views/dashboard/routes'
import auth from '@/views/auth/routes'
import ChangePasswordPage from "@/views/auth/changePassword.vue"
import PageNotFound from "@/components/ErrorPage/PageNotFound.vue"
import adminUser from '@/views/admin-user/routes'
import menu from '@/views/menu/routes'
import role from '@/views/role/routes'
import permission from '@/views/permission/routes'

export default [
  {
    name: 'main',
    path: '/',
    meta: {
      title: 'home'
    },
    redirect: {
      name: 'dashboard',
    },
    component: MainPage,
    children: [
      ...dashboard,
      {
        name: 'changePasswordPage',
        path: '/change-password',
        meta: {
          title: "changePassword"
        },
        component: ChangePasswordPage,
      },
      ...adminUser,
      ...menu,
      ...permission,
      ...role,
    ]
  },
  ...auth,
  {
    path: "/:pathMatch(.*)*", component: PageNotFound, name: 'notFound'
  }
]