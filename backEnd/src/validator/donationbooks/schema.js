const Joi = require('joi');

const DonationBookPayloadSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publisher: Joi.string().required(),
  publishYear: Joi.number().integer().min(0).required(),
  synopsis: Joi.string().required(),
  genre: Joi.string().required(),
  bookCondition: Joi.string().valid('baru', 'bekas').required(),
});

module.exports = { DonationBookPayloadSchema };
