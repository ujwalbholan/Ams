import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenService } from 'src/auth/tokens/token.service';
import { jwtConfig } from 'src/config/jwt.config';

export class TokenHelper {
  constructor(private readonly jwtservice: JwtService) {}

  validateAccessToken(token: string) {
    return this.jwtservice.verify(token, { secret: jwtConfig.accessSecret });
  }

  validateRefreshToken(token: string) {
    return this.jwtservice.verify(token, { secret: jwtConfig.refreshSecret });
  }

  async refreshTokenForUser(
    user: any,
    tokenservice: TokenService,
    db: any,
    res: Response,
  ) {
    const tokens = await tokenservice.generateToken(user);

    await db.sql.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
      tokens.refresh_token,
      user.id,
    ]);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return tokens.access_token;
  }
}
