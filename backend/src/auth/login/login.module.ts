import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TokenModule } from '../tokens/token.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TokenModule, DatabaseModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
