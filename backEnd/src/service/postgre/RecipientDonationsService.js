const { Pool } = require('pg');
const InvariantError = require('../../exeption/InvariantError');
const NotFoundError = require('../../exeption/NotFoundError');
const { nanoid } = require('nanoid');

class RecipientDonations {
    constructor() {
        this._pool = new Pool();
    }

    async addRecipientDonations({ donationBookId, recipientId }) {
        const id = `recipient_donation-${nanoid(16)}`;

        const queryUserId = {
            text: `SELECT owner from donation_books WHERE id = $1`,
            values: [donationBookId]
        }

        const resultUserId = await this._pool.query(queryUserId);

        if (!resultUserId.rows.length) {
            throw new NotFoundError('Buku donasi tidak ditemukan');
        }

        const userId = resultUserId.rows[0].owner;

        const query = {
            text: 'INSERT INTO recipient_donations (id, id_donation, user_id, recipient_id) VALUES($1, $2, $3, $4) RETURNING id, donation_status',
            values: [id, donationBookId, userId, recipientId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Gagal menambahkan permintaan donasi');
        }

        console.log(`DEBUG`, result.rows[0]);

        return {
            id: result.rows[0].id,
            donationStatus: result.rows[0].donation_status,
        };
    }
  }

  module.exports = RecipientDonations;