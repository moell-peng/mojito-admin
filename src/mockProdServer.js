import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import loginMock from '../mock/auth'
import adminUserMock from '../mock/adminUser'
import menuMock from '../mock/menu'
import permissionMock from '../mock/permission'
import permissionGroupMock from '../mock/permissionGroup'
import roleMock from '../mock/role'
import captchaMock from '../mock/captcha'

export function setupProdMockServer() {
  createProdMockServer([
    ...loginMock,
    ...adminUserMock,
    ...menuMock,
    ...permissionMock,
    ...permissionGroupMock,
    ...roleMock,
    ...captchaMock,
  ]);
}