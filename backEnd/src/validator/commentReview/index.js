const InvariantError = require('../../exeption/InvariantError');
const { validateCommentReviewSchema } = require('./schema');

const commentValidator = (payload) => {
    const validationResult = validateCommentReviewSchema.validate(payload);

    if (validationResult.error) {
        throw new InvariantError(validationResult.error.message);
    }
}

module.exports = commentValidator