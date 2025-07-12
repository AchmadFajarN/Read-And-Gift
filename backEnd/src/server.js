require('dotenv').config();
const Hapi = require("@hapi/hapi");
const inert = require('@hapi/inert');
const path = require('path');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exeption/ClientError');

// user
const users = require('./api/user');
const UserValidator = require('./validator/users');
const UserService = require('./service/postgre/userService');

// profile storage
const uploadImageProfile = require("./api/uploadImageProfile");
const StorageService = require('./service/storageService/storageService');
const UploadValidator = require('./validator/uploads');
const ImageProfileService = require('./service/postgre/imageProfileService');

// authentication
const authentication = require('./api/Authentication');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationValidator = require('./validator/authentication');
const AuthenticationService = require('./service/postgre/AuthenticationService');


const init = async() => {
    const userService = new UserService();
    const imageProfileService = new ImageProfileService();
    const storageService = new StorageService(path.resolve(__dirname, 'api/uploadImageProfile/images'));
    const authenticationService = new AuthenticationService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });

    await server.register([
        {
            plugin: Jwt
        },
        {
            plugin: inert
        }
    ]);

    server.auth.strategy('read_and_gift_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decode.payload.id
            }
        })
    })

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
        },
        {
            plugin: authentication,
            options: {
                authenticationService,
                userService,
                tokenManager: TokenManager,
                validator: AuthenticationValidator
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