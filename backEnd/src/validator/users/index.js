const InvariantError = require('../../exeption/InvariantError');
const { userSchema } = require('./schema');

const UserValidator = {
    validateUserPayload: (payload) => {
        const validationResult = userSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = UserValidator;