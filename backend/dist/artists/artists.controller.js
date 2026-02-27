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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistsController = void 0;
const common_1 = require("@nestjs/common");
const artists_service_1 = require("./artists.service");
const artist_create_dto_1 = require("./dto/artist.create.dto");
const artist_update_dto_1 = require("./dto/artist.update.dto");
const JwtRefreshGuard_1 = require("../guard/JwtRefreshGuard");
const express_1 = __importDefault(require("express"));
let ArtistsController = class ArtistsController {
    artistsService;
    constructor(artistsService) {
        this.artistsService = artistsService;
    }
    getAllArtist(page = 1, limit = 10, req) {
        const id = req['user'].sub;
        return this.artistsService.getAllArtist(id, Number(page), Number(limit));
    }
    createArtist(CreateArtistDto, req) {
        const userId = req['user'].sub;
        return this.artistsService.createArtist(CreateArtistDto, userId);
    }
    getArtistById(id, req) {
        const userId = req['user'].sub;
        return this.artistsService.getArtistById(Number(id), userId);
    }
    updateArtist(id, req, updateArtistDto) {
        const userId = req['user'].sub;
        return this.artistsService.updateArtist(Number(id), userId, updateArtistDto);
    }
    deleteArtist(id, req) {
        const userId = req['user'].id;
        console.log(userId);
        return this.artistsService.deleteArtist(Number(id), userId);
    }
};
exports.ArtistsController = ArtistsController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "getAllArtist", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artist_create_dto_1.CreateArtistDto, Object]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "createArtist", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "getArtistById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, artist_update_dto_1.UpdateArtistDto]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "updateArtist", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "deleteArtist", null);
exports.ArtistsController = ArtistsController = __decorate([
    (0, common_1.UseGuards)(JwtRefreshGuard_1.JwtRefreshGuard),
    (0, common_1.Controller)('artist'),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService])
], ArtistsController);
//# sourceMappingURL=artists.controller.js.map