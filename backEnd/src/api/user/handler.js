class userHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postUserRegister = this.postUserRegister.bind(this);
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
}

module.exports = userHandler;