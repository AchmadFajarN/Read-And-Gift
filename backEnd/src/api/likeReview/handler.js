const autoBind = require('auto-bind');

class LikeReviewHandler {
    constructor(likeSerivce, reviewService) {
        this._likeService = likeSerivce;
        this._reviewService = reviewService;

        autoBind(this);
    }

    async postLikeReviewId(req, h) {
        const { reviewId } = req.params;
        const { id: userId } = req.auth.credentials;

        await this._reviewService.verifyReviewExist(reviewId);
        await this._likeService.addLikeReview(userId, reviewId);

        const response = h.response({
            status: 'success',
            message: 'like berhasil ditambahkan'
        }).code(201);

        return response;
    }

    async getLikeReviewId(req, h) {
        const { reviewId } = req.params;

        await this._reviewService.verifyReviewExist(reviewId);
        const result = await this._likeService.getLikesByReviewId(reviewId);

        return {
            status: 'success',
            data: {
                likes: result
            }
        }
    }

    async deleteLikeReviewId(req, h) {
        const { reviewId } = req.params;
        const { id: userId } = req.auth.credentials;

        await this._reviewService.verifyReviewExist(reviewId);
        await this._likeService.deleteLikeByUserId(userId, reviewId);

        return {
            status: 'success',
            message: 'like berhasil dihapus'
        }
    }
}

module.exports = LikeReviewHandler;