require('dotenv').config();
const Hapi = require("@hapi/hapi");

// user
const users = require('./api/user');
const UserValidator = require('./validator/users');
const UserService = require('./service/postgre/userService');
const ClientError = require('./exeption/ClientError');

const init = async() => {
    const userService = new UserService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });

    await server.register([
        {
            plugin: users,
            options: {
                service: userService,
                validator: UserValidator
            }
        }
    ]);

    server.ext('onPreResponse', (req, h) => {
        const { response } = req;

        if (response instanceof ClientError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            });
            newResponse.code(response.statusCode);
            return newResponse
        }

        return h.continue;
    })

    await server.start();
    console.log("server berjalan di", server.info.uri);
}

init();