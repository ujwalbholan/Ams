import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';

@Module({
  providers: [],
  exports: [],
  imports: [],
  controllers: [RegisterController],
})
export class RegisterModlue {}
