import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { DatabaseService } from './database.service';

config({
  path: ['.env'],
});

const sql = neon(process.env.DATABASE_URL!);

const dbProvider = {
  provide: 'POSTGRES_POOL',
  useValue: sql,
};

@Module({
  providers: [dbProvider, DatabaseService],
  exports: [dbProvider, DatabaseService],
})
export class DatabaseModule {}
