import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';

export enum Gender {
  MALE = 'm',
  FEMALE = 'f',
}

export class RegisterDto {
  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  dob?: Date;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsNotEmpty()
  address?: string;
}
