import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { JwtRefreshGuard } from 'src/guard/JwtRefreshGuard';

@UseGuards(JwtRefreshGuard)
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  createMusic(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.createMusic(createMusicDto);
  }

  @Get()
  getAllMusic() {
    return this.musicService.getAllMusic();
  }

  @Get(':id')
  getMusicById(@Param('id') id: string) {
    return this.musicService.getMusicById(+id);
  }

  @Put(':id')
  updateMusic(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.updateMusic(+id, updateMusicDto);
  }

  @Delete(':id')
  deleteMusic(@Param('id') id: string) {
    return this.musicService.deleteMusic(+id);
  }
}
