class CoverPathDonationsService {
  constructor(pool) {
    this._pool = pool;
  }

  async addCoverPath(donationId, path) {
  const id = `cover-${nanoid(8)}`;

  const query = {
    text: `
      INSERT INTO cover_url_donations (id, donation_id, url)
      VALUES ($1, $2, $3)
    `,
    values: [id, donationId, path],
  };

  await this._pool.query(query);
  return id;
}
}

module.exports = CoverPathDonationsService;