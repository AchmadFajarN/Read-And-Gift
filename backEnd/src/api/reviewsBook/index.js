const ReviewHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'review',
    version: '1.0.0',
    register: async(server, { reviewService, validator }) => {
        const reviewHandler = new ReviewHandler(reviewService, validator);
        server.route(routes(reviewHandler));
    }
}