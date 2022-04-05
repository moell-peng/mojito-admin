import { login, logout } from '@/api/auth'
import { removeToken, setToken } from '@/utils/localforage'

const state = {
  token: '',
}

const getters = {
  token: state => state.token,
}

const mutations = {
  SET_TOKEN (state, {token}) {
    state.token = token
  }
}

const actions = {
  loginHandle ({ commit }, data) {
    return new Promise((resolve, reject) => {
      return login(data)
        .then(response => {
          const token = response.data.data

          commit('SET_TOKEN', {token})

          resolve(setToken(token))
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  logoutHandle ({ commit } ) {
    return new Promise((resolve, reject) => {
      return logout().then( () => {
        removeToken()
      }).catch( error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}