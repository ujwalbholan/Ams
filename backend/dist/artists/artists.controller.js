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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistsController = void 0;
const common_1 = require("@nestjs/common");
const artists_service_1 = require("./artists.service");
const JwtRefreshGuard_1 = require("../guard/JwtRefreshGuard");
let ArtistsController = class ArtistsController {
    artistsService;
    constructor(artistsService) {
        this.artistsService = artistsService;
    }
    getAllArtist(page = 1, limit = 10) {
        return this.artistsService.getAllArtist(Number(page), Number(limit));
    }
};
exports.ArtistsController = ArtistsController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "getAllArtist", null);
exports.ArtistsController = ArtistsController = __decorate([
    (0, common_1.UseGuards)(JwtRefreshGuard_1.JwtRefreshGuard),
    (0, common_1.Controller)('artist'),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService])
], ArtistsController);
//# sourceMappingURL=artists.controller.js.map