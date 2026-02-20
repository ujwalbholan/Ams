"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jwt_config_1 = require("../../config/jwt.config");
class TokenService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generateToken(user) {
        const access_token = this.jwtService.sign({ sub: user.id, email: user.email }, {
            secret: jwt_config_1.jwtConfig.accessSecret,
            expiresIn: jwt_config_1.jwtConfig.accessExpire,
        });
        const refresh_token = this.jwtService.sign({ sub: user.id, email: user.email }, { secret: jwt_config_1.jwtConfig.refreshSecret, expiresIn: jwt_config_1.jwtConfig.refreshExpire });
        return { access_token, refresh_token };
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map