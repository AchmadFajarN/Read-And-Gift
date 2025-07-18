const { nanoid } = require("nanoid");
const { Pool } = require('pg');

class CoverPathDonationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCoverPath(donationId, path) {
  const id = `cover-${nanoid(8)}`;

  const query = {
    text: `
      INSERT INTO cover_path_donations (id, donation_id, donation_image_path)
      VALUES ($1, $2, $3)
    `,
    values: [id, donationId, path],
  };

  await this._pool.query(query);
  return id;
}
}

module.exports = CoverPathDonationsService;