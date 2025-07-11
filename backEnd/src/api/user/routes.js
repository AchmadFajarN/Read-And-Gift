const routes = (handler) => [
    {
        method: "POST",
        path: "/users/register",
        handler: handler.postUserRegister
    }
]

module.exports = routes;