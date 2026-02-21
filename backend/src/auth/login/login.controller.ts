import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { LoginDto } from './login.dto';
import { LoginService } from './login.service';
import express from 'express';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const user = await this.loginService.login(dto);

    res.cookie('refresh_token', user.token.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'User Login successfully',
      ...user,
    };
  }
}
