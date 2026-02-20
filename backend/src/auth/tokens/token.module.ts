import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  providers: [TokenService],
  imports: [
    JwtModule.register({
      secret: jwtConfig.accessSecret,
      signOptions: { expiresIn: jwtConfig.accessExpire },
    }),
  ],
  exports: [TokenService],
})
export class TokenModule {}
