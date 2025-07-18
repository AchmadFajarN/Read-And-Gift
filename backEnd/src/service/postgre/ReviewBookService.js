const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const  NotFoundError  = require('../../exeption/NotFoundError');
const InvariantError = require('../../exeption/InvariantError');
const AuthorizationError = require('../../exeption/AuthorizationError');

class ReviewBookService{
    constructor(likeService, commentService) {
        this._pool = new Pool();
        this._likeService = likeService;
        this._commentService = commentService;
    }

    async addReview({ title, author, publisher, publish_year, synopsis, genre, owner, rating }) {
        const id = `review-${nanoid(16)}`
        const date = new Date();

        const query = {
            text: `INSERT INTO review_books VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
            values: [id, title, author, publisher, publish_year, synopsis, genre, date, owner, rating]
        }
        
        const result = await this._pool.query(query);
        return result.rows[0].id
    }

    async getAllReview(page = 1, limit = 9) {
        const offset =  (page - 1) * limit
        const query = {
            text: `
            SELECT 
                review_books.title, 
                review_books.author, 
                review_books.publisher, 
                review_books.publish_year, 
                review_books.synopsis, 
                review_books.genre,
                cover_url_reviews.url
            FROM review_books LEFT JOIN
                cover_url_reviews ON review_book_id = review_books.id
            LIMIT $1 OFFSET $2`,
            values: [limit, offset]
        }

        const result = await this._pool.query(query);
        return result.rows
    }

    async getReviewById(id) {
        const query = {
            text: `
            SELECT
                review_books.id,
                review_books.title,
                review_books.author,
                review_books.publisher,
                review_books.publish_year,
                review_books.synopsis,
                review_books.genre,
                cover_url_reviews.url AS cover_url
            FROM review_books
            LEFT JOIN cover_url_reviews ON review_books.id = cover_url_reviews.review_book_id
            WHERE review_books.id = $1
            `,
            values: [id]
        }

        const result = await this._pool.query(query);
        

        if (!result.rows.length) {
            throw new NotFoundError('buku tidak ditemukan')
        }

        const detail = result.rows[0]

        const likes = await this._likeService.getLikesByReviewId(id);
        const comments = await this._commentService.getComment(id);

        return {
            ...detail,
            likes: likes.length,
            comments
        };
    }

    async getReviewByUserId(userId) {
        const query = {
            text: 'SELECT * FROM review_books WHERE owner = $1',
            values: [userId]
        }

        const result = await this._pool.query(query);
        
        return result.rows;
    }

    async getReviewByTitle(title) {
        const query = {
            text: `
            SELECT 
                review_books.title, 
                review_books.author, 
                review_books.publisher, 
                review_books.publish_year, 
                review_books.synopsis, 
                review_books.genre,
                cover_url_reviews.url
            FROM review_books LEFT JOIN
                cover_url_reviews ON review_book_id = review_books.id
            WHERE review_books.title LIKE $1`,
            values: [`%${title}%`]
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            return []
        }

        return result.rows
    }

    async editPostReview(id, { title, author, publisher, publish_year, synopsis, genre, owner, rating }) {
        const query = {
            text: `UPDATE review_books
            SET title = $1,
                author = $2,
                publisher = $3,
                publish_year = $4,
                synopsis = $5,
                genre = $6,
                rating = $7
            WHERE id = $8 AND owner = $9
            RETURNING id
            `,
            values: [title, author, publisher, publish_year, synopsis, genre, rating, id, owner]
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Gagal memperbarui');
        }
    }

    async deleteReview(id) {
        const query = {
            text: 'DELETE FROM review_books WHERE id = $1 RETURNING id',
            values: [id]
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('review tidak ditemukan')
        }
    }

    async validateReviewOwner(reviewId, ownerId, role) {
        const query = {
            text: 'SELECT owner FROM review_books WHERE id = $1',
            values: [reviewId]
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('review tidak ditemukan')
        }

        if (result.rows[0].owner !== ownerId && role !== 'admin') {
            throw new AuthorizationError('anda tidak berhak mengakses resource ini')
        }
    }

    async verifyReviewExist(reviewId) {
        const query = {
            text: 'SELECT * FROM review_books WHERE  id = $1',
            values: [reviewId]
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('review tidak ditemukan')
        }
    }
}

module.exports = ReviewBookService;