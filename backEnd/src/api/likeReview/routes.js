const routes = (handler) => [
    {
        method: 'POST',
        path: '/like/{reviewId}',
        handler: handler.postLikeReviewId,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'GET',
        path: '/like/{reviewId}',
        handler: handler.getLikeReviewId,
        options: {
            auth: 'read_and_gift_jwt'
        }
    },
    {
        method: 'DELETE',
        path: '/like/{reviewId}',
        handler: handler.deleteLikeReviewId,
        options: {
            auth: 'read_and_gift_jwt'
        }
    }
]

module.exports = routes;
    
