export default [
  {
    url: '/api/permission-user-all',
    method: 'get',
    response: () => {
      return { 
        data: [
          "admin-user.index","admin-user.show","admin-user.store","admin-user.update",
          "admin-user.destroy","admin-user.roles","admin-user.assign-roles","role.index",
          "role.show","role.store","role.update","role.destroy","role.permissions",
          "role.assign-permissions","role.guard-name-roles","permission.index",
          "permission.show","permission.store","permission.update","permission.destroy",
          "menu.index","menu.show","menu.store","menu.update","menu.destroy",
          "permission-group.index","permission-group.show","permission-group.store",
          "permission-group.update","permission-group.destroy",
          "permission-group.guard-name-for-permission","permission-group.all"
        ]
      }
    }
  },
  {
    url: '/api/permission',
    method: 'get',
    response: () => {
      return {
        data: permissions,
        meta: {
          "current_page": 1,
          "from": 1,
          "last_page": 1,
          "path": "/api/permission",
          "per_page": 15,
          "to": 1,
          "total": 1
        },
      }
    }
  },
  {
    url: '/api/permission/:id',
    method: "delete",
    statusCode: 204,
  },
  {
    url: '/api/permission/:id',
    method: "patch",
    statusCode: 204,
  },
  {
    url: '/api/permission',
    method: "post",
    statusCode: 201,
  },
]

let permissions = [{
  "id": 24,
  "pg_id": 4,
  "name": "menu.update",
  "guard_name": "admin",
  "display_name": "修改",
  "group": {
      "id": 4,
      "name": "菜单",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 25,
  "pg_id": 4,
  "name": "menu.destroy",
  "guard_name": "admin",
  "display_name": "删除",
  "group": {
      "id": 4,
      "name": "菜单",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 26,
  "pg_id": 5,
  "name": "permission-group.index",
  "guard_name": "admin",
  "display_name": "列表",
  "group": {
      "id": 5,
      "name": "权限组",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 27,
  "pg_id": 5,
  "name": "permission-group.show",
  "guard_name": "admin",
  "display_name": "详细",
  "group": {
      "id": 5,
      "name": "权限组",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 28,
  "pg_id": 5,
  "name": "permission-group.store",
  "guard_name": "admin",
  "display_name": "添加",
  "group": {
      "id": 5,
      "name": "权限组",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 29,
  "pg_id": 5,
  "name": "permission-group.update",
  "guard_name": "admin",
  "display_name": "修改",
  "group": {
      "id": 5,
      "name": "权限组",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 30,
  "pg_id": 5,
  "name": "permission-group.destroy",
  "guard_name": "admin",
  "display_name": "删除",
  "group": {
      "id": 5,
      "name": "权限组",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 31,
  "pg_id": 5,
  "name": "permission-group.guard-name-for-permission",
  "guard_name": "admin",
  "display_name": "获取看守器权限",
  "group": {
      "id": 5,
      "name": "权限组",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 32,
  "pg_id": 5,
  "name": "permission-group.all",
  "guard_name": "admin",
  "display_name": "所有权限组",
  "group": {
      "id": 5,
      "name": "权限组",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:32",
  "updated_at": "2021-08-21 03:03:32"
}, {
  "id": 2,
  "pg_id": 1,
  "name": "admin-user.show",
  "guard_name": "admin",
  "display_name": "详细",
  "group": {
      "id": 1,
      "name": "管理员",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:31",
  "updated_at": "2021-08-21 03:03:31"
}, {
  "id": 3,
  "pg_id": 1,
  "name": "admin-user.store",
  "guard_name": "admin",
  "display_name": "添加",
  "group": {
      "id": 1,
      "name": "管理员",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:31",
  "updated_at": "2021-08-21 03:03:31"
}, {
  "id": 4,
  "pg_id": 1,
  "name": "admin-user.update",
  "guard_name": "admin",
  "display_name": "修改",
  "group": {
      "id": 1,
      "name": "管理员",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:31",
  "updated_at": "2021-08-21 03:03:31"
}, {
  "id": 5,
  "pg_id": 1,
  "name": "admin-user.destroy",
  "guard_name": "admin",
  "display_name": "删除",
  "group": {
      "id": 1,
      "name": "管理员",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:31",
  "updated_at": "2021-08-21 03:03:31"
}, {
  "id": 6,
  "pg_id": 1,
  "name": "admin-user.roles",
  "guard_name": "admin",
  "display_name": "用户角色列表",
  "group": {
      "id": 1,
      "name": "管理员",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:31",
  "updated_at": "2021-08-21 03:03:31"
}, {
  "id": 7,
  "pg_id": 1,
  "name": "admin-user.assign-roles",
  "guard_name": "admin",
  "display_name": "分配角色",
  "group": {
      "id": 1,
      "name": "管理员",
      "created_at": "",
      "updated_at": ""
  },
  "icon": null,
  "sequence": null,
  "description": null,
  "created_name": null,
  "updated_name": null,
  "created_at": "2021-08-21 03:03:31",
  "updated_at": "2021-08-21 03:03:31"
}]