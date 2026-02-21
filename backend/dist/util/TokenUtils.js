"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHelper = void 0;
const jwt_config_1 = require("../config/jwt.config");
class TokenHelper {
    jwtservice;
    constructor(jwtservice) {
        this.jwtservice = jwtservice;
    }
    validateAccessToken(token) {
        return this.jwtservice.verify(token, { secret: jwt_config_1.jwtConfig.accessSecret });
    }
    validateRefreshToken(token) {
        return this.jwtservice.verify(token, { secret: jwt_config_1.jwtConfig.refreshSecret });
    }
    async refreshTokenForUser(user, tokenservice, db, res) {
        const tokens = await tokenservice.generateToken(user);
        await db.sql.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
            tokens.refresh_token,
            user.id,
        ]);
        res.cookie('refresh_token', tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return tokens.access_token;
    }
}
exports.TokenHelper = TokenHelper;
//# sourceMappingURL=TokenUtils.js.map