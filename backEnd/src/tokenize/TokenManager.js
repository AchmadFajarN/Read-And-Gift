const Jwt = require('@hapi/jwt');
const InvariantError =  require('../exeption/InvariantError');

const TokenManager = {
    generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
    verifyAccessToken: (refreshToken) => {
        try {
            const artifacts = Jwt.token.decode(refreshToken);
            Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN);

            const { payload } = artifacts.decoded
            return payload;
        } catch(err) {
            throw new InvariantError("Refresh Token Tidak Valid")
        }
    }
}

module.exports = TokenManager;