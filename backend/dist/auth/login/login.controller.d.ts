import { LoginDto } from './login.dto';
import { LoginService } from './login.service';
import express from 'express';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(dto: LoginDto, res: express.Response): Promise<{
        email: any;
        token: {
            access_token: string;
            refresh_token: string;
        };
        message: string;
    }>;
}
