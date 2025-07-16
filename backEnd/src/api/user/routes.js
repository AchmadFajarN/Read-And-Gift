const routes = (handler) => [
    {
        method: "POST",
        path: "/users/register",
        handler: handler.postUserRegister,
    },
    {
        method: 'GET',
        path: '/user/{id}',
        handler: handler.getUserById,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        handler: handler.putUserById,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: handler.deleteUserById,
        options: {
            auth: 'read_and_gift_jwt'
        }
    }
]

module.exports = routes;