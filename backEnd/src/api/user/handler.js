const autoBind = require('auto-bind');
const AuthorizationError = require('../../exeption/AuthorizationError');

class userHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postUserRegister(req, h) {
        this._validator.validateUserPayload(req.payload);
        const { username, fullname, password, email, no_contact, address, sosmed_url } = req.payload;

        const result = await this._service.addUser({ username, fullname, password, email, no_contact, address, sosmed_url });

        const response = h.response({
            status: 'success',
            data: {
                id: result
            }
        });

        response.code(201);
        return response
    }

    async getUserById(req, h) {
        const { id } = req.params;
        const result = await this._service.getUserById(id);

        const response = h.response({
            status: 'success',
            data: {
                result
            }
        });

        return response;
    }

    async putUserById(req, h) {
        this._validator.validatePutUserPayload(req.payload);
        const { id } = req.params;
        const { id:owner } = req.auth.credentials;

        if (id !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }

        const { username, fullname, address, sosmed_url, no_contact } = req.payload;

        await this._service.editUserById(id, { username, fullname, address, sosmed_url, no_contact });

        const response = h.response({
            status: 'success',
            message: 'akun berhasil diupdate'
        });

        response.code(200);
        return response;
    }

    async deleteUserById(req, h) {
        const { id } = req.params;
        const { id:owner } = req.auth.credentials;

        if (id !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini')
        }

        await this._service.deleteUserById(id);

        const response = h.response({
            status: 'success',
            message: 'akun berhasil dihapus'
        });

        return response;
    }
}

module.exports = userHandler;