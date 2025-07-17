const CommentReviewHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'comment_review',
    version: '1.0.0',
    register: async (server, { commentService, validator, reviewService }) => {
        const commentReviewHandler = new CommentReviewHandler(commentService, validator, reviewService);
        server.route(routes(commentReviewHandler));
    }
}