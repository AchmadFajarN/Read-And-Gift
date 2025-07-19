const Joi = require('joi');

const reviewSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publisher: Joi.string(),
    publish_year: Joi.number(),
    synopsis: Joi.string(),
    genre: Joi.array().items(Joi.string()),
    rating: Joi.number()
});

module.exports = { reviewSchema };