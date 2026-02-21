import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist.create.dto';
import { UpdateArtistDto } from './dto/artist.update.dto';
import { JwtRefreshGuard } from 'src/guard/JwtRefreshGuard';

@UseGuards(JwtRefreshGuard)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get('')
  getAllArtist(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.artistsService.getAllArtist(Number(page), Number(limit));
  }
}
