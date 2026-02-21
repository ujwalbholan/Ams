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
    databaseServioce;
    constructor(databaseServioce) {
        this.databaseServioce = databaseServioce;
    }
    async getAllArtist(page, limit) {
        const offset = (page - 1) * limit;
        const data = await this.databaseServioce.query(`SELECT * FROM artists
       ORDER BY id DESC
       LIMIT $1 OFFSET $2`, [limit, offset]);
        const total = await this.databaseServioce.query(`SELECT COUNT(*) FROM artists`);
        return {
            total: Number(total[0].count),
            page,
            limit,
            data,
        };
    }
};
exports.ArtistsService = ArtistsService;
exports.ArtistsService = ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ArtistsService);
//# sourceMappingURL=artists.service.js.map