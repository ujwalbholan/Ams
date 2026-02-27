"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let MusicService = class MusicService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async createMusic(createMusicDto) {
        try {
            const artist = await this.databaseService.query(`SELECT id FROM artists WHERE id = $1`, [createMusicDto.artist_id]);
            if (!artist || artist.length === 0) {
                throw new common_1.NotFoundException('Artist not found');
            }
            const result = await this.databaseService.query(`INSERT INTO music 
          (artist_id, title, album_name, genre)
         VALUES ($1, $2, $3, $4)
         RETURNING *`, [
                createMusicDto.artist_id,
                createMusicDto.title,
                createMusicDto.album_name ?? null,
                createMusicDto.genre ?? null,
            ]);
            return result[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to create music');
        }
    }
    async getAllMusic() {
        try {
            const result = await this.databaseService.query(`SELECT * FROM music`);
            return result;
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to fetch music');
        }
    }
    async getMusicById(id) {
        try {
            const result = await this.databaseService.query(`SELECT * FROM music WHERE id = $1`, [id]);
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`Music with id ${id} not found`);
            }
            return result[0];
        }
        catch (err) {
            console.error('Error fetching music:', err);
            if (err instanceof common_1.NotFoundException)
                throw err;
            throw new common_1.InternalServerErrorException('Failed to fetch music');
        }
    }
    async updateMusic(id, updateMusicDto) {
        try {
            const result = await this.databaseService.query(`UPDATE music
       SET artist_id = $1,
           title = $2,
           album_name = $3,
           genre = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`, [
                updateMusicDto.artist_id,
                updateMusicDto.title,
                updateMusicDto.album_name,
                updateMusicDto.genre,
                id,
            ]);
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException('Music with not found');
            }
            return result[0];
        }
        catch {
            throw new common_1.InternalServerErrorException('music not found');
        }
    }
    async deleteMusic(id) {
        try {
            const result = await this.databaseService.query(`DELETE FROM music WHERE id = $1 RETURNING *`, [id]);
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`Music with id ${id} not found`);
            }
            return { message: 'Music deleted successfully' };
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to delete music');
        }
    }
};
exports.MusicService = MusicService;
exports.MusicService = MusicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MusicService);
//# sourceMappingURL=music.service.js.map