const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exeption/NotFoundError');
const InvariantError = require('../../exeption/InvariantError');

class LikeReviewService {
    constructor() {
        this._pool = new Pool();
    }

    async addLikeReview(userId, reviewId) {
        const id = `like-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO likes_review VALUES($1, $2, $3)',
            values: [id, userId, reviewId]
        };

        try {
            await this._pool.query(query)
        } catch(err) {
            if (err.code === '23505') {
                throw new InvariantError('anda sudah menyukai review ini')
            }

            throw err
        }
    }

    async getLikesByReviewId(reviewId) {
        const query = {
            text: 'SELECT COUNT(*) FROM likes_review WHERE review_id = $1',
            values: [reviewId]
        };

        const result = await this._pool.query(query);

        return parseInt(result.rows[0].count, 10);
    }

    async deleteLikeByUserId(userId, reviewId) {
        const query = {
            text: 'DELETE FROM likes_review WHERE user_id = $1 AND review_id = $2',
            values: [userId, reviewId] 
        };

        const result = await this._pool.query(query);

        if (result.rowCount === 0) {
            throw new NotFoundError('Like tidak ditemukan atau sudah dihapus')
        }

    }
}

module.exports = LikeReviewService;