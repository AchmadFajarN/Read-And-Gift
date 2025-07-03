require('dotenv').config();
const Hapi = require("@hapi/hapi");

const init = async() => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return {
                status: "success",
            }
        }
    })

    await server.start();
    console.log("server berjalan di", server.info.uri);
}

init();