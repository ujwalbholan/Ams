"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const token_service_1 = require("../auth/tokens/token.service");
const TokenUtils_1 = require("../util/TokenUtils");
const database_service_1 = require("../database/database.service");
let JwtRefreshGuard = class JwtRefreshGuard {
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
        const accrssToken = req.headers['authorization']?.split(' ')[1];
        const refreshToken = req.cookies?.refresh_token;
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
            if (!result || result.length === 0) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const user = result[0];
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
};
exports.JwtRefreshGuard = JwtRefreshGuard;
exports.JwtRefreshGuard = JwtRefreshGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService,
        token_service_1.TokenService])
], JwtRefreshGuard);
//# sourceMappingURL=JwtRefreshGuard.js.map