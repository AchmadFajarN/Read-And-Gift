const { Pool } = require('pg');
const { nanoid } = require("nanoid");
const bcrypt = require('bcrypt');
const InvariantError = require('../../exeption/InvariantError');

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

}

module.exports = UserService;