import { createStore } from "vuex"
import app from './modules/app'
import breadcrumb from "./modules/breadcrumb"
import auth from "./modules/auth"
import tag from "./modules/tag"
import permission from "./modules/permission"
import plugin from "./plugin"

const store = createStore({
  modules: {
    app,
    auth,
    breadcrumb,
    tag,
    permission, 
  },
  plugins: [plugin]
})


export default store