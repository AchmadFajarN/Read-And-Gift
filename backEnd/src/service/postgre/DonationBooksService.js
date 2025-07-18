const { Pool } = require('pg');
const InvariantError = require('../../exeption/InvariantError');
const NotFoundError = require('../../exeption/NotFoundError');
const AuthorizationError = require('../../exeption/AuthorizationError');
const { nanoid } = require('nanoid');
const mapDBToModel = require('../../utils/donationMapDBToModel');

class DonationBooksService {
    constructor() {
        this._pool = new Pool();
    }
    
  async postDonationBook({ title, author, publisher, publishYear, synopsis, genre, bookCondition, owner}) {
    //TODO: BUAT VALIDATOR
    const id = `donation_book-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
 
    const query = {
      text: 'INSERT INTO donation_books (id, title, author, publisher, publish_year, synopsis, genre, book_condition, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      values: [id, title, author, publisher, publishYear, synopsis, genre, bookCondition, createdAt, updatedAt, owner],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows[0].id) {
      throw new InvariantError('Buku gagal ditambahkan');
    }
 
    //TODO: await this._cacheService.delete(`donation_book:${owner}`);
    return result.rows[0].id;
  }

  async getDonationBooks() {
const query = {
  text: `
    SELECT 
      donation_books.id, 
      donation_books.title, 
      donation_books.author, 
      donation_books.synopsis, 
      cover_path_donations.donation_image_path
    FROM donation_books
    LEFT JOIN cover_path_donations 
      ON donation_books.id = cover_path_donations.donation_id
  `,
};


    const result = await this._pool.query(query);
    const mappedResult = result.rows.map(mapDBToModel);

    return mappedResult;
  }

    async getDonationBookById(id) {
    const query = {
      text: `SELECT donation_books.*, users.username
      FROM donation_books
      LEFT JOIN users ON users.id = donation_books.owner
      WHERE donation_books.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Buku donasi tidak ditemukan');
    }
 
    return result.rows.map(mapDBToModel)[0];
  }

  async putDonationBookById(id, { title, author, publisher, publishYear, synopsis, genre, bookCondition }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE donation_books SET title = $1, author = $2, publisher = $3, publish_year = $4, synopsis = $5, genre = $6, book_condition = $7, updated_at = $8 WHERE id = $9 RETURNING id',
      values: [title, author, publisher, publishYear, synopsis, genre, bookCondition, updatedAt, id],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui buku. Id tidak ditemukan');
    }
 
    return result.rows[0].id;
  }
 
  async deleteDonationBookById(id) {
    const query = {
      text: 'DELETE FROM donation_books WHERE id = $1 RETURNING id',
      values: [id],
    };
 
    const result = await this._pool.query(query);
 
    if (result.rows.length === 0) {
      return
    }
 
    return result.rows[0].id;
  }

  async verifyDonationBookOwner(id, owner, role) {
    const query = {
      text: 'SELECT owner FROM donation_books WHERE id = $1',
      values: [id],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rows.length) {
      throw new NotFoundError('Buku tidak ditemukan');
    }
 
    const book = result.rows[0];

    if (role === 'admin') {
      return;
    }
 
    if (book.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = DonationBooksService;