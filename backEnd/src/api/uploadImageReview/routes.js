const path = require('path');

const routes = (handler) => [
    {
        method: 'POST',
        path: "/review/{id}/img",
        handler: handler.postImageHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                output: 'stream',
                maxBytes: 512000
            }
        }
    },
    {
        method: 'GET',
        path: '/review/img/{params*}',
        handler: {
            directory: {
                path: path.resolve(__dirname, "images")
            }
        }
    }
]

module.exports = routes;