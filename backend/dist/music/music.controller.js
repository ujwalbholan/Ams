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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const music_service_1 = require("./music.service");
const create_music_dto_1 = require("./dto/create-music.dto");
const update_music_dto_1 = require("./dto/update-music.dto");
const JwtRefreshGuard_1 = require("../guard/JwtRefreshGuard");
let MusicController = class MusicController {
    musicService;
    constructor(musicService) {
        this.musicService = musicService;
    }
    createMusic(createMusicDto) {
        return this.musicService.createMusic(createMusicDto);
    }
    getAllMusic() {
        return this.musicService.getAllMusic();
    }
    getMusicById(id) {
        return this.musicService.getMusicById(+id);
    }
    updateMusic(id, updateMusicDto) {
        return this.musicService.updateMusic(+id, updateMusicDto);
    }
    deleteMusic(id) {
        return this.musicService.deleteMusic(+id);
    }
};
exports.MusicController = MusicController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_music_dto_1.CreateMusicDto]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "createMusic", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "getAllMusic", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "getMusicById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_music_dto_1.UpdateMusicDto]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "updateMusic", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "deleteMusic", null);
exports.MusicController = MusicController = __decorate([
    (0, common_1.UseGuards)(JwtRefreshGuard_1.JwtRefreshGuard),
    (0, common_1.Controller)('music'),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
//# sourceMappingURL=music.controller.js.map