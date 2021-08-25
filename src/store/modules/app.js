import config from '@/config'

const state = {
  locale: config.locale,
}

const getters = {
  locale: state => state.locale
}

const mutations = {
  SET_LOCALE (state, locale) {
    state.locale = locale
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}