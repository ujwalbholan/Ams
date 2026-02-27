import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist.create.dto';
import { UpdateArtistDto } from './dto/artist.update.dto';
export declare class ArtistsController {
    private readonly artistsService;
    constructor(artistsService: ArtistsService);
    getAllArtist(page: number | undefined, limit: number | undefined, req: Request): Promise<{
        total: number;
        page: any;
        limit: any;
        data: any;
    }>;
    createArtist(CreateArtistDto: CreateArtistDto, req: Request): Promise<any>;
    getArtistById(id: number, req: Request): Promise<any>;
    updateArtist(id: number, req: Request, updateArtistDto: UpdateArtistDto): Promise<any>;
    deleteArtist(id: number, req: Request): Promise<{
        message: string;
    }>;
}
