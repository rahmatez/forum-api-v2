const Jwt = require("@hapi/jwt");
const InvariantError = require("../../Commons/exceptions/InvariantError");
const AuthenticationTokenManager = require("../../Applications/security/AuthenticationTokenManager");

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    return this._jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  async createRefreshToken(payload) {
    return this._jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyRefreshToken(token) {
    try {
      const artifacts = this._jwt.token.decode(token);
      this._jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError("refresh token tidak valid");
    }
  }

  async decodePayload(token) {
    const artifacts = this._jwt.token.decode(token);
    return artifacts.decoded.payload;
  }
}

module.exports = JwtTokenManager;
