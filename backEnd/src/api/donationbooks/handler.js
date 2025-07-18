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
      owner: id
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

  async getDonationBooksHandler() {
  const books = await this._donationBooksService.getDonationBooks();
  return {
    status: 'success',
    data: {
      books,
    },
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
    console.log("PAYLIAD TEST", payload);
    // this._donationBookValidator.validateDonationBookPayload(payload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { role } = request.auth.credentials;
 
    await this._donationBooksService.verifyDonationBookOwner(id, credentialId, role);
    await this._donationBooksService.putDonationBookById(id, payload);
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
