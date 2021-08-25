export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body, query }) => {
      console.log(body, query)

      return {
        data: {
          token: "48|ebuGxNhidTL3gkJBkBt2pMBvuC7OwZ81inG4zV2b"
        }
      }
    }
  },
  {
    url: 'api/user-change-password',
    method: 'patch',
    statusCode: 204,
  }
]