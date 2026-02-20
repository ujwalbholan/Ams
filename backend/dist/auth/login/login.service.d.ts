import { LoginDto } from './login.dto';
import { TokenService } from '../tokens/token.service';
export declare class LoginService {
    private readonly sql;
    private readonly tokenService;
    constructor(sql: any, tokenService: TokenService);
    login(dto: LoginDto): Promise<{
        email: any;
        access_token: string;
    }>;
}
