const InvariantError = require('../../exeption/InvariantError');
const { reviewSchema } = require('./schema');

const ReviewValidator = {
    validatePayloadReview: (payload) => {
        const validationResult = reviewSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message)
        }
    }
}

module.exports = ReviewValidator;