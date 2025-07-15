const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exeption/NotFoundError');

class ImageReviewService{
    constructor() {
        this._pool = new Pool();
    }

    async uploadImageReview(reviewId, url) {
        const id = `review-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO cover_url_reviews VALUES ($1, $2, $3) RETURNING id',
            values: [id, url, reviewId]
        }

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('review tidak ada');
        }

        return result;
    }
}

module.exports = ImageReviewService;