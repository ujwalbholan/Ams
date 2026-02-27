import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
