const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exeption/NotFoundError');

class ImageProfileService {
    constructor() {
        this._pool = new Pool();
    }

    async uploadImageProfile(userId, url) {
        const id = `imguser-${nanoid(16)}`;
        const query = {
            text: "INSERT INTO image_profile_url VALUES ($1, $2, $3) RETURNIG id",
            values: [id, userId, url]
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError("user tidak ada");
        }

        return result;
    }
}

module.exports = ImageProfileService;