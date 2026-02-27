import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/auth/tokens/token.service';
import { DatabaseService } from 'src/database/database.service';
export declare class JwtRefreshGuard implements CanActivate {
    private readonly databaseService;
    private readonly jwtService;
    private readonly tokenService;
    private tokenHelper;
    constructor(databaseService: DatabaseService, jwtService: JwtService, tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
