class AuthenticationsHandler {
    constructor(authenticationService, userService, tokenManager, validator) {
        this._authenticationService = authenticationService;
        this._tokenManager = tokenManager;
        this._validator = validator
        this._userService = userService;

        this.postAuthLogin = this.postAuthLogin.bind(this);
        this.putAuthLogin = this.putAuthLogin.bind(this);
        this.deleteAuthLogin = this.deleteAuthLogin.bind(this);
    };

    async postAuthLogin (req, h) {
        this._validator.validatePostAuthenticationPayload(req.payload);

        const { email, password } = req.payload;
        const { id, role } = await this._userService.verifyUserCredentials(email, password);
        console.log(id, role)

        const accessToken = this._tokenManager.generateAccessToken({ id, role });
        const refreshToken = this._tokenManager.generateRefreshToken({ id, role });

        await this._authenticationService.addRefreshToken(refreshToken);

        const response = h.response({
            status: 'success',
            message: "Login Berhasil",
            data: {
                accessToken,
                refreshToken
            }
        })

        response.code(201);
        return response;
    }

    async putAuthLogin(req, h) {
        this._validator.validatePutAuthenticationPayload(req.payload);

        const { refreshToken } = req.payload;
        await this._authenticationService.verifyRefreshToken(refreshToken);
        const { id, role } = this._tokenManager.verifyRefreshToken(refreshToken);

        const accessToken = this._tokenManager.generateAccessToken({ id, role });
        return {
            status: 'success',
            message: 'Access token berhasil diperbarui',
            data: {
                accessToken
            }
        }
    }

    async deleteAuthLogin(req, h) {
        this._validator.validateDeleteAuthenticationPayload(req.payload);

        const { refreshToken } = req.payload;
        await this._authenticationService.verifyRefreshToken(refreshToken);
        await this._authenticationService.deleteRefreshToken(refreshToken);

        return {
            status: 'success',
            message: 'refresh token berhasil dihapus'
        }
    }
}

module.exports = AuthenticationsHandler;