const autoBind = require('auto-bind');

class RecipientDonationsHandler {
  constructor(recipientDonationsService, recipientDonationsValidator) {
    this._recipientDonationsService = recipientDonationsService;
    this._recipientDonationsValidator = recipientDonationsValidator;

    autoBind(this);
  }

  async postRecipientDonationHandler(request, h) {
    const { id: recipientId } = request.auth.credentials;
    const { donationBookId } = request.params;

    this._recipientDonationsValidator.validateRecipientDonationPayload({ donationBookId });

    const { donationStatus, id } =
      await this._recipientDonationsService.addRecipientDonations({ donationBookId, recipientId });

    return {
      status: 'success',
      data: {
        donationStatus,
        id,
      },
    };
  }

  async updateDonationStatusHandler(request) {
    const { recipientDonationId } = request.params;
    const { status } = request.payload;
    const { id: userId } = request.auth.credentials;

    await this._recipientDonationsService.updateDonationStatus({ recipientDonationId, status, userId });

    return {
      status: 'success',
      message: 'Status berhasil diperbarui',
    };
  }

async getRecipientDonationsHandler(request) {
  const { id: userId } = request.auth.credentials;
  const { status } = request.query;

  const data = await this._recipientDonationsService.getRecipientDonations({ userId, status });

  return {
    status: 'success',
    data,
  };
}
}

module.exports = RecipientDonationsHandler;
