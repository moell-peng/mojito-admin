export default [
  {
    url: '/api/my-menu',
    method: 'get',
    response: () => menus(),
  },
  {
    url: '/api/menu',
    method: 'get',
    response: () => menus(),
  },
  {
    url: '/api/menu',
    method: 'post',
    statusCode: 201,
  },
  {
    url: '/api/menu/:id',
    method: 'patch',
    statusCode: 204,
  },
  {
    url: '/api/menu/:id',
    method: 'delete',
    statusCode: 204,
  }
]

const menus = () => {
  return {
    data: [
      {
          "id": 1,
          "parent_id": 0,
          "icon": "Orange",
          "uri": "/dashboard",
          "is_link": 0,
          "permission_name": null,
          "name": "Dashboard",
          "guard_name": "admin",
          "sequence": 0,
          "created_at": null,
          "updated_at": "2021-07-04T23:13:57.000000Z"
      },
      {
          "id": 2,
          "parent_id": 0,
          "icon": "Setting",
          "uri": "/admin",
          "is_link": 0,
          "permission_name": null,
          "name": "System",
          "guard_name": "admin",
          "sequence": 0,
          "created_at": null,
          "updated_at": "2021-07-04T23:15:06.000000Z",
          "children": [
              {
                  "id": 3,
                  "parent_id": 2,
                  "icon": null,
                  "uri": "/admin-user",
                  "is_link": 0,
                  "permission_name": null,
                  "name": "Account",
                  "guard_name": "admin",
                  "sequence": 0,
                  "created_at": null,
                  "updated_at": "2021-07-04T23:14:11.000000Z"
              },
              {
                  "id": 4,
                  "parent_id": 2,
                  "icon": null,
                  "uri": "/role",
                  "is_link": 0,
                  "permission_name": null,
                  "name": "Role",
                  "guard_name": "admin",
                  "sequence": 0,
                  "created_at": null,
                  "updated_at": "2021-07-04T23:14:19.000000Z"
              },
              {
                  "id": 5,
                  "parent_id": 2,
                  "icon": null,
                  "uri": "/permission",
                  "is_link": 0,
                  "permission_name": null,
                  "name": "Permission",
                  "guard_name": "admin",
                  "sequence": 0,
                  "created_at": null,
                  "updated_at": "2021-07-04T23:14:25.000000Z"
              },
              {
                  "id": 6,
                  "parent_id": 2,
                  "icon": null,
                  "uri": "/menu",
                  "is_link": 0,
                  "permission_name": null,
                  "name": "Menu",
                  "guard_name": "admin",
                  "sequence": 0,
                  "created_at": null,
                  "updated_at": "2021-07-04T23:14:48.000000Z"
              }
          ]
      }
    ]
  }
}