const uploadImageReviewHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'imageReview',
    version: '1.0.0',
    register: async(server, { reviewStorage, validator, imageReviewService }) => {
        const uploadImageReview = new uploadImageReviewHandler(reviewStorage, validator, imageReviewService);
        server.route(routes(uploadImageReview));
    }
}