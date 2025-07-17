const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exeption/NotFoundError');

class CommentReviewService {
    constructor() {
        this._pool = new Pool();
    }

    async addComment(reviewId, userId, comment) {
        const id = `comment-${nanoid(16)}`;
        const dateNow = new Date()

        const query = {
            text: 'INSERT INTO comments_review VALUES($1, $2, $3, $4, $5, $6)',
            values: [id, userId, reviewId, comment, dateNow, dateNow]
        }
        
        return await this._pool.query(query);
    }

    async getComment(reviewId) {
        const query = {
            text: `
            SELECT 
                comments_review.comment,
                users.username
            FROM comments_review 
            LEFT JOIN users ON comments_review.user_id = users.id
            WHERE review_id = $1`,
            values: [reviewId]
        }

        const result = await this._pool.query(query);

        return result.rows
    }

    async editComment(reviewId, userId, comment) {
        const query = {
            text: `UPDATE comments_review
            SET comment = $1
            WHERE user_id = $2 AND review_id = $3
            `,
            values: [comment, userId, reviewId]
        };

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('komentar tidak ditemukan atau bukan milik anda')
        }
        return result.rows
    }

    async deleteComment(reviewId, userId) {
        const query = {
            text: 'DELETE FROM comments_review WHERE user_id = $1 AND review_id = $2',
            values: [userId, reviewId]
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('komentar tidak ditemukan atau bukan milik anda')
        }
    }
}

module.exports = CommentReviewService