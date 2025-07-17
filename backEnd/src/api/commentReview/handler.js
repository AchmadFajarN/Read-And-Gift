const autoBind = require('auto-bind');

class CommentReviewHandler {
    constructor(commentService, validator, reviewService) {
        this._commentService = commentService;
        this._reviewService = reviewService;
        this._validator = validator;

        autoBind(this);
    }

    async postCommentIdReview(req, h) {
        this._validator.validateCommentPayload(req.payload);
        const { reviewId } = req.params;
        const { id: userId } = req.auth.credentials;
        const { comment } = req.payload;
        
        await this._reviewService.verifyReviewExist(reviewId);
        await this._commentService.addComment(reviewId, userId, comment);

        const response = h.response({
            status: 'success',
            message: 'komen berhasil ditambahkan'
        }).code(201);

        return response;
    }

    async getCommentIdReview(req, h) {
        const { reviewId } = req.params;
        await this._reviewService.verifyReviewExist(reviewId);
        const result = await this._commentService.getComment(reviewId);

        const response = h.response({
            status: 'success',
            data: {
                comments: result
            }
        });

        response.code(200);
        return response;
    }

    async putCommentIdReview(req,h) {
        this._validator.validateCommentPayload(req.payload);
        const { reviewId } = req.params;
        const { id: userId } = req.auth.credentials;
        const { comment } = req.payload;

        await this._reviewService.verifyReviewExist(reviewId);
        await this._commentService.editComment(reviewId, userId, comment);
        
        const response = h.response({
            status: 'success',
            message: 'Komentar berhasil di update'
        });
        response.code(200);
        return response;   
    }

    async deleteCommentIdReview(req, h) {
        const { reviewId } = req.params;
        const { id:userId } = req.auth.credentials;

        await this._reviewService.verifyReviewExist(reviewId);
        await this._commentService.deleteComment(reviewId, userId);

        const response = h.response({
            status: 'success',
            message: 'komentar berhasil dihapus'
        });

        response.code(200);
        return response;
    }
}

module.exports = CommentReviewHandler;