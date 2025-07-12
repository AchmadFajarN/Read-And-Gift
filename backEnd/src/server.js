require('dotenv').config();
const Hapi = require("@hapi/hapi");
const inert = require('@hapi/inert');
const path = require('path');

// user
const users = require('./api/user');
const UserValidator = require('./validator/users');
const UserService = require('./service/postgre/userService');
const ClientError = require('./exeption/ClientError');

// profile storage
const uploadImageProfile = require("./api/uploadImageProfile");
const StorageService = require('./service/storageService/storageService');
const UploadValidator = require('./validator/uploads');
const ImageProfileService = require('./service/postgre/imageProfileService');


const init = async() => {
    const userService = new UserService();
    const imageProfileService = new ImageProfileService();
    const storageService = new StorageService(path.resolve(__dirname, 'api/uploadImageProfile/images'));

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });

    await server.register([
        {
            plugin: inert
        }
    ]);

    await server.register([
        {
            plugin: users,
            options: {
                service: userService,
                validator: UserValidator
            }
        },
        {
            plugin: uploadImageProfile,
            options: {
                storageService,
                validator: UploadValidator,
                imageProfileService
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