import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TokenService } from 'src/auth/tokens/token.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [MusicController],
  providers: [MusicService, TokenService, JwtService],
})
export class MusicModule {}
