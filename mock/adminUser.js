export default [
  {
    url: '/api/admin-user',
    method: 'get',
    response: ({ body, query }) => {
      let data = [
        {
          created_at: "2021-08-21 03:03:30",
          id: 1,
          name: "admin",
          status: true,
          updated_at: "2021-08-21 03:03:30",
          username: "admin",
        }
      ]
    
      return {
        data,
        meta: {
          "current_page": 1,
          "from": 1,
          "last_page": 1,
          "path": "/api/admin-user",
          "per_page": 15,
          "to": 1,
          "total": 15
        },
      }
    }
  },
  {
    url: '/api/admin-user/:id',
    method: "delete",
    statusCode: 204,
  },
  {
    url: '/api/admin-user/:id',
    method: "patch",
    statusCode: 204,
  },
  {
    url: '/api/admin-user',
    method: "post",
    statusCode: 201,
  },
  {
    url: '/api/admin-user/:id/roles/:guardName',
    method: "put",
    statusCode: 204,
  },
  {
    url: '/api/admin-user/:id/roles/:guardName',
    method: "get",
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