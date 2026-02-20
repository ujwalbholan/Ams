import { LoginDto } from './login.dto';
import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(dto: LoginDto): Promise<{
        email: any;
        access_token: string;
        message: string;
    }>;
}
