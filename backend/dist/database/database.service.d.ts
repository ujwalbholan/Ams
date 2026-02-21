export declare class DatabaseService {
    private readonly sql;
    constructor(sql: any);
    query(query: string, params?: any[]): Promise<any>;
    get instance(): any;
}
