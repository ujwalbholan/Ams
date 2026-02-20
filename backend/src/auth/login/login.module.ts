import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [LoginController],
  exports: [],
})
export class LoginModule {}
