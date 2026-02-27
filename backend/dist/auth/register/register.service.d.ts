import { RegisterDto } from './register.dto';
export declare class RegisterService {
    private readonly sql;
    constructor(sql: any);
    register(dto: RegisterDto): Promise<any>;
}
