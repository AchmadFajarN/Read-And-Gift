const autoBind = require('auto-bind');

class ReviewHandler {
    constructor(reviewService, validator) {
        this._reviewService = reviewService;
        this._validator = validator;

        autoBind(this);
    }

    async postReview(req, h) {
        try {
            const { id:owner } = req.auth.credentials;
            console.log(owner)
            const { title, author, publisher, publish_year, synopsis, genre, rating, description } = req.payload;
            this._validator.validatePayloadReview(req.payload);

            const result = await this._reviewService.addReview({ title, author, publisher, publish_year, synopsis, genre, owner, rating, description });

            const response = h.response({
                status: 'success',
                message: 'review berhasil ditambahkan',
                data: {
                    reviewId: result
                }
            }).code(201);
    
            return response;
        } catch(err) {
            console.log(err)
        }
    }

    async getAllReview(req, h) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 9;
        const { title } = req.query;

        const result = await this._reviewService.getAllReview(page, limit, title);
        return {
            status: 'success',
            message: 'Review Berhasil didapatkan',
            data: {
                result
            }
        };
    }

    async getReview(req, h) {
        const { id } = req.params;

        const review = await this._reviewService.getReviewById(id);
        const response = h.response({
            status: 'success',
            message: 'Review berhasil didapatkan',
            data: {
                review
            }
        });

        return response;
    }

    async getReviewByUserId(req, h) {
        const { userId } = req.params;

        const result = await this._reviewService.getReviewByUserId(userId);

        const response =  h.response({
            status: 'success',
            message: 'Review berhasil didapatkan',
            data: {
                result
            }
        });
        return response;
    }


    async putReview(req, h) {   
        const { id:owner } = req.auth.credentials
        const { id } = req.params;
        const {  title, author, publisher, publish_year, synopsis, genre, rating  } = req.payload;

        this._validator.validatePayloadReview(req.payload);

        await this._reviewService.validateReviewOwner(id, owner);
        await this._reviewService.editPostReview(id, { title, author, publisher, publish_year, synopsis, genre, owner, rating });
        const response = h.response({
            status: 'success',
            message: 'review sukses diedit'
        });

        return response;
    }

    async deleteReview(req, h) {
        const { id } = req.params;
        const { id:owner } = req.auth.credentials;
        const { role } = req.auth.credentials;

        await this._reviewService.validateReviewOwner(id, owner, role);
        await this._reviewService.deleteReview(id);
    
        const response = h.response({
            status: 'success',
            message: 'review berhasil dihapus'
        }).code(200);

        return response;
    }
}

module.exports = ReviewHandler;