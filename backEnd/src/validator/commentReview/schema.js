const Joi = require('joi');

const validateCommentReviewSchema = Joi.object({
    comment: Joi.string().required()
});

module.exports = { validateCommentReviewSchema };