import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ArtistsModule } from './artists/artists.module';
import { LoginModule } from './auth/login/login.module';
import { RegisterModlue } from './auth/register/register.module';

@Module({
  imports: [DatabaseModule, ArtistsModule, LoginModule, RegisterModlue],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
