import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/debug')
  // debug(@Req() req: Request) {
  //   console.log(req.headers);
  //   console.log(req.cookies);
  //   return 'ok';
  // }
}
