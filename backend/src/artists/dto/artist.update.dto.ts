import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './artist.create.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
