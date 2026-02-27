import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/artist.create.dto';
import { UpdateArtistDto } from './dto/artist.update.dto';
export declare class ArtistsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getAllArtist(id: any, page: any, limit: any): Promise<{
        total: number;
        page: any;
        limit: any;
        data: any;
    }>;
    createArtist(artist: CreateArtistDto, userId: number): Promise<any>;
    getArtistById(id: number, userId: number): Promise<any>;
    updateArtist(id: number, userId: number, artist: UpdateArtistDto): Promise<any>;
    deleteArtist(id: number, userId: number): Promise<{
        message: string;
    }>;
}
