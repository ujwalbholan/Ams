import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenService } from 'src/auth/tokens/token.service';
export declare class TokenHelper {
    private readonly jwtservice;
    constructor(jwtservice: JwtService);
    validateAccessToken(token: string): any;
    validateRefreshToken(token: string): any;
    refreshTokenForUser(user: any, tokenservice: TokenService, db: any, res: Response): Promise<string>;
}
