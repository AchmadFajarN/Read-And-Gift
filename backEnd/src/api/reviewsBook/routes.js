const routes = (handler) => [
    {
        method: 'POST',
        path: '/review',
        handler: handler.postReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'GET',
        path: '/review',
        handler: handler.getAllReview
    },
    {
        method: 'GET',
        path: '/review/{id}',
        handler: handler.getReview
    }, 
    {
        method: 'GET',
        path: '/review/user/{userId}',
        handler: handler.getReviewByUserId
    },
    {
        method: 'PUT',
        path: '/review/{id}',
        handler: handler.putReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'DELETE',
        path: '/review/{id}',
        handler: handler.deleteReview,
        options: {
            auth: 'read_and_gift_jwt'
        }
    }
];

module.exports = routes;