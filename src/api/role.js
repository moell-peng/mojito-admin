import http from '@/utils/http'

const basicRoute = '/api/role'

export const getRoleList = (params) => {
  return http.get(basicRoute, {
    params
  })
}

export const guardNameRoles = (guardName) => {
  return http.get(`/api/guard-name-roles/${guardName}`)
}

export const rolePermission = (id) => {
  return http.get(`${basicRoute}/${id}/permissions`)
}

export const roleAssignPermission = (id, permissions) => {
  return http.put(`${basicRoute}/${id}/permissions`, {
    permissions
  })
}


export const addRole = (data) => {
  return http.post(basicRoute, data)
}

export const editRole = (id, data) => {
  return http.patch(`${basicRoute}/${id}`, data)
}

export const deleteRole = id => {
  return http.delete(`${basicRoute}/${id}`)
}



export const getRoleAll = (params) => {
  return http.get('/api/role_list')
}

export const roleMenu = (id) => {
  return http.get(`${basicRoute}/${id}/menus`)
}

export const roleAssignMenu = (id, menus) => {
  return http.put(`${basicRoute}/${id}/menus`, {
    menus
  })
}

export const roleToggleMenu = (id, menu_ids) => {
  return http.put(`${basicRoute}/${id}/togglemenus`, {
    id: menu_ids
  })
}
export const loadRoles = () => {
  return http.get('/api/user/role_mine')
}