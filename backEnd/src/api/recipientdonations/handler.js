const autoBind = require('auto-bind');

class RecipientDonationsHandler {
  constructor(recipientDonationsService, recipientDonationsValidator) {
    this._recipientDonationsService = recipientDonationsService;
    this._recipientDonationsValidator = recipientDonationsValidator;

    autoBind(this);
  }

  async postRecipientDonationHandler(request, h) {
    try {
      const { id: recipientId } = request.auth.credentials;
      console.log(`RECIPIENT`, recipientId);
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
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RecipientDonationsHandler;
