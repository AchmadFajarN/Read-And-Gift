const InvariantError = require('../../exeption/InvariantError');
const { ImageHeaderSchema } = require('./schema');

const UploadValidator = {
    validateImageHeader: (payload) => {
        const validationResult = ImageHeaderSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = UploadValidator;