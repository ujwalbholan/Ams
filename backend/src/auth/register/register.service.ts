import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './register.dto';

@Injectable()
export class RegisterService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  async register(dto: RegisterDto) {
    const { email, password } = dto;

    const existingUser = await this.sql.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    );

    if (existingUser.length > 0) {
      throw new BadRequestException('Email Already Exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const User = await this.sql.query(
      `INSERT INTO users (email, password)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, hashPassword],
    );

    return User[0];
  }
}
