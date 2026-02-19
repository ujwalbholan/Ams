export declare class AppService {
    private readonly sql;
    constructor(sql: any);
    getHello(): string;
    getTable(name: 'playing_with_neon' | 'another_table'): Promise<any[]>;
}
