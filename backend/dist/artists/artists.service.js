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
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ArtistsService = class ArtistsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getAllArtist(page, limit) {
        const offset = (page - 1) * limit;
        try {
            const data = await this.databaseService.query(`SELECT * FROM artists
       ORDER BY id DESC
       LIMIT $1 OFFSET $2`, [limit, offset]);
            const result = await this.databaseService.query(`SELECT COUNT(*) FROM artists`);
            if (!result?.length) {
                throw new common_1.NotFoundException('Artist creation faild');
            }
            return {
                total: Number(result[0].count),
                page,
                limit,
                data,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException();
        }
    }
    async createArtist(artist, userId) {
        try {
            const result = await this.databaseService.query(`INSERT INTO artists 
    (name, dob, gender, address, first_release_year, no_of_albums_released, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`, [
                artist.name,
                artist.dob,
                artist.gender,
                artist.address ?? null,
                artist.first_release_year,
                artist.no_of_albums_released ?? 0,
                userId,
            ]);
            if (!result?.length) {
                throw new common_1.NotFoundException('Artist creation faild');
            }
            return result[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException();
        }
    }
    async getArtistById(id, userId) {
        try {
            const result = await this.databaseService.query(`SELECT * FROM artists WHERE id = $1 AND created_by = $2`, [id, userId]);
            if (!result?.length) {
                throw new common_1.NotFoundException('Artist not found');
            }
            return result[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateArtist(id, userId, artist) {
        try {
            const result = await this.databaseService.query(`UPDATE artists
         SET name=$1, dob=$2, gender=$3, address=$4,
             first_release_year=$5,
             no_of_albums_released=$6,
             updated_at = CURRENT_TIMESTAMP
         WHERE id=$7 AND created_by=$8
         RETURNING *`, [
                artist.name,
                artist.dob,
                artist.gender,
                artist.address,
                artist.first_release_year,
                artist.no_of_albums_released,
                id,
                userId,
            ]);
            if (!result?.length) {
                throw new common_1.NotFoundException('Artist not found');
            }
            return result[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteArtist(id, userId) {
        try {
            const result = await this.databaseService.query(`DELETE FROM artists WHERE id=$1 AND created_by=$2 RETURNING *`, [id, userId]);
            if (!result?.length) {
                throw new common_1.NotFoundException('Artist not found');
            }
            return { message: 'Artist deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.ArtistsService = ArtistsService;
exports.ArtistsService = ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ArtistsService);
//# sourceMappingURL=artists.service.js.map