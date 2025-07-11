const userHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'users',
    version: '1.0.0',
    register: async(server, { service, validator }) => {
        const userHand = new userHandler(service, validator);
        server.route(routes(userHand));
    }
}