import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from '../tokens/token.module';

@Module({
  providers: [RegisterService],
  imports: [DatabaseModule, TokenModule],
  controllers: [RegisterController],
})
export class RegisterModlue {}
