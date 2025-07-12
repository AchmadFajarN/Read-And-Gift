const routes = (handler) => [
    {
        method: 'POST',
        path: '/auth/login',
        handler: handler.postAuthLogin
    },
    {
        method: 'PUT',
        path: '/auth/login',
        handler: handler.putAuthLogin
    },
    {
        method: 'DELETE',
        path: '/auth/login',
        handler: handler.deleteAuthLogin
    }
]

module.exports = routes;