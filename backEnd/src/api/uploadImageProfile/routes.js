const path = require('path');

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
    },
    {
        method: 'GET',
        path: '/profile/{params*}',
        handler: {
            directory: {
                path: path.resolve(__dirname, "images")
            }
        }
    }
]

module.exports = routes;