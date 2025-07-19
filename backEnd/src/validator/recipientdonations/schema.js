const Joi = require('joi');

const RecipientDonationPayloadSchema = Joi.object({
  donationBookId: Joi.string().required(),
});

module.exports = { RecipientDonationPayloadSchema };
