import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/auth/tokens/token.service';
import { TokenHelper } from 'src/util/TokenUtils';
import { DatabaseService } from 'src/database/database.service';

export class JwtRefreshGuard implements CanActivate {
  private tokenHelper: TokenHelper;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {
    this.tokenHelper = new TokenHelper(this.jwtService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const accrssToken = req.header['authorization']?.split(' ')[1];
    const refreshToken = req.cookies['refresh_token'];

    if (!accrssToken) {
      throw new UnauthorizedException('No access Token');
    }

    try {
      req['user'] = this.tokenHelper.validateAccessToken(accrssToken);
      return true;
    } catch {
      if (!refreshToken) {
        throw new UnauthorizedException('Access expired. Refresh required.');
      }

      const result = await this.databaseService.query(
        'SELECT * FROM users WHERE refresh_token = $1',
        [refreshToken],
      );

      if (result.length === 0) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = result.rows[0];

      try {
        this.tokenHelper.validateRefreshToken(refreshToken);
      } catch {
        throw new UnauthorizedException(
          'Refresh token expired. Login required.',
        );
      }

      const newAccessToken = this.tokenHelper.refreshTokenForUser(
        user,
        this.tokenService,
        this.databaseService,
        res,
      );
      req['user'] = { id: user.id, email: user.email };
      req['newAccessToken'] = newAccessToken;

      return true;
    }
  }
}
