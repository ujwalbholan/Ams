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
  Req,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist.create.dto';
import { UpdateArtistDto } from './dto/artist.update.dto';
import { JwtRefreshGuard } from 'src/guard/JwtRefreshGuard';
import Request from 'express';

@UseGuards(JwtRefreshGuard)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get('')
  getAllArtist(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.artistsService.getAllArtist(Number(page), Number(limit));
  }

  @Post('')
  createArtist(@Body() CreateArtistDto: CreateArtistDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return this.artistsService.createArtist(CreateArtistDto, userId);
  }

  @Get(':id')
  getArtistById(@Param('id') id: Number, @Req() req: Request) {
    const userId = req['user'].sub;
    return this.artistsService.getArtistById(Number(id), userId);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: Number,
    @Req() req: Request,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const userId = req['user'].sub;
    return this.artistsService.updateArtist(
      Number(id),
      userId,
      updateArtistDto,
    );
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: number, @Req() req: Request) {
    const userId = req['user'].id;
    console.log(userId);
    return this.artistsService.deleteArtist(Number(id), userId);
  }
}
