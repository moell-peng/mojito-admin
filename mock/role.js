export default [
  {
    url: '/api/role',
    method: 'get',
    response: ({ body, query }) => {
      return {
        data: [
          {
            created_at: "2021-08-21 03:03:30",
            description: null,
            guard_name: "admin",
            id: 1,
            name: "admin",
            updated_at: "2021-08-21 03:03:30",
          },
          {
            created_at: "2021-08-21 03:03:30",
            description: null,
            guard_name: "admin",
            id: 2,
            name: "mojito",
            updated_at: "2021-08-21 03:03:30",
          }
        ],
        meta: {
          "current_page": 1,
          "from": 1,
          "last_page": 1,
          "path": "/api/role",
          "per_page": 15,
          "to": 1,
          "total": 15
        },
      }
    }
  },
  {
    url: '/api/role/:id',
    method: "delete",
    statusCode: 204,
  },
  {
    url: '/api/role/:id',
    method: "patch",
    statusCode: 204,
  },
  {
    url: '/api/role',
    method: "post",
    statusCode: 201,
  },
  {
    url: '/api/role/:id/roles/:guardName',
    method: "put",
    statusCode: 204,
  },
  {
    url: '/api/role/:id/permissions',
    method: 'put',
    statusCode: 204,
  },
  {
    url: '/api/role/:id/permissions',
    method: 'get',
    response: () => {
      return {
        data: [{
          "id": 1,
          "name": "admin",
          "guard_name": "admin",
          "description": null,
          "created_at": "2021-08-21 03:03:30",
          "updated_at": "2021-08-21 03:03:30"
        }]
      }
    }
  },
  {
    url: '/api/guard-name-roles/:guardName',
    method: 'get',
    response: () => {
      return {
        data: [{
          "id": 1,
          "name": "admin",
          "guard_name": "admin",
          "description": null,
          "created_at": "2021-08-21 03:03:30",
          "updated_at": "2021-08-21 03:03:30"
        }]
      }
    }
  }
]