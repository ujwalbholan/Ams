import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ArtistsModule } from './artists/artists.module';
import { LoginModule } from './auth/login/login.module';
import { RegisterModlue } from './auth/register/register.module';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    DatabaseModule,
    ArtistsModule,
    LoginModule,
    RegisterModlue,
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
