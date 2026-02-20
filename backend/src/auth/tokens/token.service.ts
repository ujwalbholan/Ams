import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: any) {
    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      {
        secret: jwtConfig.accessSecret,
        expiresIn: jwtConfig.accessExpire,
      },
    );

    const refresh_token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { secret: jwtConfig.refreshSecret, expiresIn: jwtConfig.refreshExpire },
    );

    return { access_token, refresh_token };
  }
}
