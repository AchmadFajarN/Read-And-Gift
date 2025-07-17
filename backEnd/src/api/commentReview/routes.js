const routes = (handler) => [
    {
        method: 'POST',
        path: '/review/{reviewId}/comment',
        handler: handler.postCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'GET',
        path: '/review/{reviewId}/comment',
        handler: handler.getCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/review/{reviewId}/comment',
        handler: handler.putCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'DELETE',
        path: '/review/{reviewId}/comment',
        handler: handler.deleteCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    }
];

module.exports = routes;