const path = require('path');
const autoBind = require('auto-bind');

class DonationBooksHandler {
  constructor(donationBooksService, donationStorageService, coverPathDonationsService, donationBookValidator) {
    this._donationBooksService = donationBooksService;
    this._donationStorageService = donationStorageService;
    this._coverPathDonationsService = coverPathDonationsService;
    this._donationBookValidator = donationBookValidator;

    autoBind(this);
  }

  async postDonationBookHandler(request, h) {
    try {
    const { id } = request.auth.credentials;
    const { payload } = request;
    console.log("JALAN");

    this._donationBookValidator.validateDonationBookPayload(payload);
    const donationData = {
      ...payload,
      owner: id,
      publishYear: Number(payload.publishYear),
    };

    const bookId = await this._donationBooksService.postDonationBook(donationData);

    if (payload.cover) {
      const meta = payload.cover.hapi;
      const extension = path.extname(meta.filename);
      const filename = `donation_book-${bookId}${extension}`;

      await this._donationStorageService.writeFile(payload.cover, filename, 'donationCovers');

      await this._coverPathDonationsService.addCoverPath(
        bookId,
        `/uploads/donationCovers/${filename}`
      );
    }

    return h
      .response({
        status: 'success',
        message: 'Buku donasi berhasil ditambahkan',
        data: { bookId },
      })
      .code(201);
  } catch(err) {
    throw err;
  }}

  async getDonationBooksHandler(request) {
    const { page = 1, limit = 9 } = request.query;

    const data = await this._donationBooksService.getDonationBooks({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });

    return {
      status: 'success',
      data,
    };
  }

  async getDonationBookByIdHandler(request, h) {
    try{
    const { id } = request.params;
 
    const book = await this._donationBooksService.getDonationBookById(id);
    return {
      status: 'success',
      data: {
        book,
      },
    };
  } catch(err) {
    throw err;
  }
}

  async putDonationBookByIdHandler(request, h) {
    try{
    const { payload } = request;
    const newPayload = {
      ...payload,
      publishYear: Number(payload.publishYear)
    }

    console.log("PAYLIAD TEST", newPayload);

    this._donationBookValidator.validateDonationBookPayload(newPayload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { role } = request.auth.credentials;

    await this._donationBooksService.verifyDonationBookOwner(id, credentialId, role);
    await this._donationBooksService.putDonationBookById(id, newPayload);
    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  } catch(err) {
    throw err;
  }
}

  async deleteDonationBookByIdHandler(request, h) {
  try {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._donationBooksService.verifyDonationBookOwner(id, credentialId);
    await this._donationBooksService.deleteDonationBookById(id);
 
    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  } catch (err) {
    throw err;
  }
}
}

module.exports = DonationBooksHandler;
