export declare enum Gender {
    MALE = "m",
    FEMALE = "f"
}
export declare class RegisterDto {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    phone: string;
    dob?: Date;
    gender?: Gender;
    address?: string;
}
