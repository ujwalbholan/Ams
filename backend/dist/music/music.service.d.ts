import { CreateMusicDto } from './dto/create-music.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateMusicDto } from './dto/update-music.dto';
export declare class MusicService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    createMusic(createMusicDto: CreateMusicDto): Promise<any>;
    getAllMusic(): Promise<any>;
    getMusicById(id: number): Promise<any>;
    updateMusic(id: number, updateMusicDto: UpdateMusicDto): Promise<any>;
    deleteMusic(id: number): Promise<{
        message: string;
    }>;
}
