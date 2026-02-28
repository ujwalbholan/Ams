/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMusic(createMusicDto: CreateMusicDto) {
    try {
      const artist = await this.databaseService.query(
        `SELECT id FROM artists WHERE id = $1`,
        [createMusicDto.artist_id],
      );

      if (!artist || artist.length === 0) {
        throw new NotFoundException('Artist not found');
      }

      const result = await this.databaseService.query(
        `INSERT INTO music 
          (artist_id, title, album_name, genre)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [
          createMusicDto.artist_id,
          createMusicDto.title,
          createMusicDto.album_name ?? null,
          createMusicDto.genre ?? null,
        ],
      );

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create music');
    }
  }

  async getAllMusic(id, page, limit) {
    const offset = (page - 1) * limit;
    try {
      const data = await this.databaseService.query(
        `SELECT m.*
        FROM music m
        JOIN artists a ON m.artist_id = a.id
        WHERE a.created_by = $1
        ORDER BY m.id DESC
        LIMIT $2 OFFSET $3`,
        [id, limit, offset],
      );

      const result = await this.databaseService.query(
        `SELECT COUNT(*) FROM artists
       WHERE artist_id = $1`,
        [id],
      );

      if (!result?.length) {
        throw new NotFoundException('Muisc creation failed');
      }

      return {
        total: Number(result[0].count),
        page,
        limit,
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getMusicById(id: number) {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM music WHERE id = $1`,
        [id],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException(`Music with id ${id} not found`);
      }

      return result[0];
    } catch (err) {
      console.error('Error fetching music:', err);
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to fetch music');
    }
  }

  async updateMusic(id: number, updateMusicDto: UpdateMusicDto) {
    try {
      const result = await this.databaseService.query(
        `UPDATE music
       SET artist_id = $1,
           title = $2,
           album_name = $3,
           genre = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
        [
          updateMusicDto.artist_id,
          updateMusicDto.title,
          updateMusicDto.album_name,
          updateMusicDto.genre,
          id,
        ],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException('Music with not found');
      }

      return result[0];
    } catch {
      throw new InternalServerErrorException('music not found');
    }
  }

  async deleteMusic(id: number) {
    try {
      const result = await this.databaseService.query(
        `DELETE FROM music WHERE id = $1 RETURNING *`,
        [id],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException(`Music with id ${id} not found`);
      }
      return { message: 'Music deleted successfully' };
    } catch {
      throw new InternalServerErrorException('Failed to delete music');
    }
  }
}
