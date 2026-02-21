"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArtistDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const artist_create_dto_1 = require("./artist.create.dto");
class UpdateArtistDto extends (0, mapped_types_1.PartialType)(artist_create_dto_1.CreateArtistDto) {
}
exports.UpdateArtistDto = UpdateArtistDto;
//# sourceMappingURL=artist.update.dto.js.map