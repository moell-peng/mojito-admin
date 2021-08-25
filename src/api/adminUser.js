import http from '@/utils/http'

export const getAdminUserList = (params) => {
  return http.get('/api/admin-user', {
    params
  })
}

export const getUserRoles = (id, guardName) => {
  return http.get(`/api/admin-user/${id}/roles/${guardName}`)
}

export const assginRoles = (id, guardName, roles) => {
  return http.put(`/api/admin-user/${id}/roles/${guardName}`, {
    roles
  })
}

export const addAdminUser = (data) => {
  return http.post('/api/admin-user', data)
}

export const editAdminUser = (id, data) => {
  return http.patch(`/api/admin-user/${id}`, data)
}

export const deleteAdminUser = id => {
  return http.delete(`/api/admin-user/${id}`)
}