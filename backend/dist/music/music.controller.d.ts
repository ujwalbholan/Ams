import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    createMusic(createMusicDto: CreateMusicDto): Promise<any>;
    getAllMusic(): Promise<any>;
    getMusicById(id: string): Promise<any>;
    updateMusic(id: string, updateMusicDto: UpdateMusicDto): Promise<any>;
    deleteMusic(id: string): Promise<{
        message: string;
    }>;
}
