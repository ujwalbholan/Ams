import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  getHello(): string {
    return 'Hello World!';
  }

  // async getTable(name: string): Promise<any[]> {
  //   const data = await this.sql(`SELECT * FROM ${name}`);
  //   return data;
  // }

  async getTable(name: 'playing_with_neon' | 'another_table'): Promise<any[]> {
    let tableName: string;

    switch (name) {
      case 'playing_with_neon':
        tableName = 'playing_with_neon';
        break;
      case 'another_table':
        tableName = 'another_table';
        break;
      default:
        throw new Error('Invalid table name');
    }

    return await this.sql.query(`SELECT * FROM ${tableName}`);
  }
}
