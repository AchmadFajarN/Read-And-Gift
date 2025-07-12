const {
    postAuthenticationPayloadSchema,
    putAuthenticationPayloadSchema,
    deleteAuthenticationPayloadSchema
} = require('./schema');
const InvariantError = require('../../exeption/InvariantError');

const AuthenticationValidator = {
    validatePostAuthenticationPayload: (payload) => {
        const validationResult = postAuthenticationPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },

    putAuthenticationPayload: (payload) => {
        const validationResult = putAuthenticationPayloadSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },

    deleteAuthenticationPayload: (payload) => {
        const validationResult = deleteAuthenticationPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message)
        }
    }
}

module.exports = AuthenticationValidator;