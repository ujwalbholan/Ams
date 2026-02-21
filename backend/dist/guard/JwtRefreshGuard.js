"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshGuard = void 0;
const common_1 = require("@nestjs/common");
const TokenUtils_1 = require("../util/TokenUtils");
class JwtRefreshGuard {
    databaseService;
    jwtService;
    tokenService;
    tokenHelper;
    constructor(databaseService, jwtService, tokenService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.tokenHelper = new TokenUtils_1.TokenHelper(this.jwtService);
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const accrssToken = req.header['authorization']?.split(' ')[1];
        const refreshToken = req.cookies['refresh_token'];
        if (!accrssToken) {
            throw new common_1.UnauthorizedException('No access Token');
        }
        try {
            req['user'] = this.tokenHelper.validateAccessToken(accrssToken);
            return true;
        }
        catch {
            if (!refreshToken) {
                throw new common_1.UnauthorizedException('Access expired. Refresh required.');
            }
            const result = await this.databaseService.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken]);
            if (result.length === 0) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const user = result.rows[0];
            try {
                this.tokenHelper.validateRefreshToken(refreshToken);
            }
            catch {
                throw new common_1.UnauthorizedException('Refresh token expired. Login required.');
            }
            const newAccessToken = this.tokenHelper.refreshTokenForUser(user, this.tokenService, this.databaseService, res);
            req['user'] = { id: user.id, email: user.email };
            req['newAccessToken'] = newAccessToken;
            return true;
        }
    }
}
exports.JwtRefreshGuard = JwtRefreshGuard;
//# sourceMappingURL=JwtRefreshGuard.js.map