import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';
import { TokenService } from '../tokens/token.service';

@Injectable()
export class LoginService {
  constructor(
    @Inject('POSTGRES_POOL') private readonly sql: any,
    private readonly tokenService: TokenService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const userResult = await this.sql.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    if (userResult.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = userResult[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.tokenService.generateToken(user);

    await this.sql.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
      token.refresh_token,
      user.id,
    ]);

    return { email: user.email, access_token: token.access_token };
  }
}
