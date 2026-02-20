import { Controller, Get } from '@nestjs/common';

@Controller('register')
export class RegisterController {
  constructor() {}

  @Get('/')
  getOk(): string {
    return 'okk';
  }
}
