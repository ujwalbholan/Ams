import { DatabaseService } from 'src/database/database.service';
export declare class ArtistsService {
    private readonly databaseServioce;
    constructor(databaseServioce: DatabaseService);
    getAllArtist(page: any, limit: any): Promise<{
        total: number;
        page: any;
        limit: any;
        data: any;
    }>;
}
