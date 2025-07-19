const LikeReviewHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'like_review',
    version: '1.0.0',
    register: async(server, { likeService, reviewService }) => {
        const likeReviewHandler = new LikeReviewHandler(likeService, reviewService);
        server.route(routes(likeReviewHandler));
    }
}