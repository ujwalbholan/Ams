import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    register(dto: RegisterDto): Promise<any>;
}
