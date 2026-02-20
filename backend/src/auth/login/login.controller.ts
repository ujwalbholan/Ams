import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() dto: LoginDto) {
    const user = await this.loginService.login(dto);
    return {
      message: 'User Login successfully',
      ...user,
    };
  }
}
