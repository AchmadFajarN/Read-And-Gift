const { DonationBookPayloadSchema } = require('./schema');
const InvariantError = require('../../exeption/InvariantError');

const donationBookValidator = {
  validateDonationBookPayload: (payload) => {
    const validationResult = DonationBookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = donationBookValidator;
