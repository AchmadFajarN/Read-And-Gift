const routes = (handler) => [
    {
        method: 'POST',
        path: '/review',
        handler: handler.postReview
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
        path: '/review/{userId}',
        handler: handler.getReviewByUserId
    },
    {
        method: 'PUT',
        path: '/review/{id}',
        handler: handler.putReview
    },
    {
        method: 'DELETE',
        path: '/review/{id}',
        handler: handler.deleteReview
    }
];

module.exports = routes;