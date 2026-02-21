import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('POSTGRES_POOL')
    private readonly sql: any,
  ) {}

  async query(query: string, params?: any[]) {
    return this.sql.query(query, params);
  }
}
