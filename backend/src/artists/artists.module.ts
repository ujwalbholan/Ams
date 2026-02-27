import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/auth/tokens/token.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, JwtService, TokenService],
})
export class ArtistsModule {}
