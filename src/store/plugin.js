import { setHttpToken } from '@/utils/http'
import { setPermissions } from '@/utils/localforage'

const subscribe = (store) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case 'SET_TOKEN':
        setHttpToken(state.auth.token.token)
        break
      case 'SET_PERMISSIONS':
        setPermissions(Object.values(state.permission.permissions))
        break
    }
  })
}

export default (store) => {
  subscribe(store)
}