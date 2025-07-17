const routes = (handler) => [
    {
        method: 'POST',
        path: '/comment/{reviewId}',
        handler: handler.postCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'GET',
        path: '/comment/{reviewId}',
        handler: handler.getCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/comment/{reviewId}',
        handler: handler.putCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'DELETE',
        path: '/comment/{reviewId}',
        handler: handler.deleteCommentIdReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    }
];

module.exports = routes;