const { RecipientDonationPayloadSchema } = require('./schema');
const InvariantError = require('../../exeption/InvariantError');

const RecipientDonationValidator = {
  validateRecipientDonationPayload: (payload) => {
    const validationResult = RecipientDonationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = RecipientDonationValidator;
