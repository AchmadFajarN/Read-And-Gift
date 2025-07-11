const routes = (handler) => [
    {
        method: 'POST',
        path: "/users/{id}/profileimg",
        handler: handler.postUploadImageHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                output: 'stream',
                maxBytes: 512000
            }
        }
    }
]

module.exports = routes;