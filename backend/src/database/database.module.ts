import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { DatabaseService } from './database.service';
import { JwtService } from '@nestjs/jwt';
import { ArtistsModule } from 'src/artists/artists.module';

config({
  path: ['.env'],
});

const sql = neon(process.env.DATABASE_URL!);

const dbProvider = {
  provide: 'POSTGRES_POOL',
  useValue: sql,
};

@Module({
  providers: [dbProvider, DatabaseService, JwtService],
  exports: [dbProvider, DatabaseService],
})
export class DatabaseModule {}
