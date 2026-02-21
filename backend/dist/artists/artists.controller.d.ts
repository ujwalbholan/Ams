import { ArtistsService } from './artists.service';
export declare class ArtistsController {
    private readonly artistsService;
    constructor(artistsService: ArtistsService);
    getAllArtist(page?: number, limit?: number): Promise<{
        total: number;
        page: any;
        limit: any;
        data: any;
    }>;
}
