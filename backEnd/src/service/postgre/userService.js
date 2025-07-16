const { Pool } = require('pg');
const { nanoid } = require("nanoid");
const bcrypt = require('bcrypt');
const InvariantError = require('../../exeption/InvariantError');
const AuthenticationError = require('../../exeption/AuthenticationError');
const NotFoundError = require('../../exeption/NotFoundError');

class UserService {
    constructor() {
        this._pool = new Pool();
    }

    async addUser({ username, fullname, password, email, no_contact, address, sosmed_url = [] }) {
        await this.verifyUsername(username);

        const id = `users-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 16);

        const query = {
            text: `INSERT INTO users (id, username, fullname, address, sosmed_url, password, no_contact, email)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            values: [id, username, fullname, address, sosmed_url, hashedPassword, no_contact, email]
        }

        const result = await this._pool.query(query);
        return result.rows[0].id;
    }

    async verifyUsername(username) {
        const query = {
            text: "SELECT * FROM users WHERE username = $1",
            values: [username]
        }

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError("username sudah digunakan")
        }
    }

    async verifyUserCredentials(email, password) {
        const query = {
            text: 'SELECT id, email, password, role FROM users WHERE email = $1',
            values: [email]
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new AuthenticationError('kredential yang anda berikan salah')
        }

        const { id, password:hashedPassword, role } = result.rows[0];
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new AuthenticationError('kredential yang anda berikan salah')
        }
        
        return {id, role};
    }

    async getUserById(id) {
        const query = {
            text: `SELECT 
                      users.username,
                      users.fullname,
                      image_profile_url.url
                   FROM users LEFT JOIN
                      image_profile_url ON users.id = image_profile_url.user_id
                   WHERE users.id = $1`,
            values: [id]
        }
        const result = await this._pool.query(query);
        
        if (!result.rows.length) {
            throw new NotFoundError('user tidak ditemukan');
        }

        return await result.rows[0];
    }

    async editUserById(userId, { username, fullname, address, sosmed_url, no_contact }) {
        const query = {
            text: `UPDATE users
            SET username = $1,
                fullname = $2,
                address = $3,
                sosmed_url = $4,
                no_contact = $5
            WHERE id = $6 RETURNING id`,
            values: [username, fullname, address, sosmed_url, no_contact, userId]
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('user tidak ditemukan')
        }
    }

    async deleteUserById(userId) {
        const query = {
            text: 'DELETE from users WHERE id = $1',
            values: [userId]
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('user tidak ditemukan')
        }
    }

}

module.exports = UserService;