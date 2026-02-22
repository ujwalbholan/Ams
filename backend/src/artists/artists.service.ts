import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/artist.create.dto';
import { UpdateArtistDto } from './dto/artist.update.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllArtist(page, limit) {
    const offset = (page - 1) * limit;

    try {
      const data = await this.databaseService.query(
        `SELECT * FROM artists
       ORDER BY id DESC
       LIMIT $1 OFFSET $2`,
        [limit, offset],
      );

      const result = await this.databaseService.query(
        `SELECT COUNT(*) FROM artists`,
      );

      if (!result?.length) {
        throw new NotFoundException('Artist creation faild');
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

  async createArtist(artist: CreateArtistDto, userId: number) {
    try {
      const result = await this.databaseService.query(
        `INSERT INTO artists 
    (name, dob, gender, address, first_release_year, no_of_albums_released, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
        [
          artist.name,
          artist.dob,
          artist.gender,
          artist.address ?? null,
          artist.first_release_year,
          artist.no_of_albums_released ?? 0,
          userId,
        ],
      );
      if (!result?.length) {
        throw new NotFoundException('Artist creation faild');
      }

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getArtistById(id: number, userId: number) {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM artists WHERE id = $1 AND created_by = $2`,
        [id, userId],
      );

      if (!result?.length) {
        throw new NotFoundException('Artist not found');
      }

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async updateArtist(id: number, userId: number, artist: UpdateArtistDto) {
    try {
      const result = await this.databaseService.query(
        `UPDATE artists
         SET name=$1, dob=$2, gender=$3, address=$4,
             first_release_year=$5,
             no_of_albums_released=$6,
             updated_at = CURRENT_TIMESTAMP
         WHERE id=$7 AND created_by=$8
         RETURNING *`,
        [
          artist.name,
          artist.dob,
          artist.gender,
          artist.address,
          artist.first_release_year,
          artist.no_of_albums_released,
          id,
          userId,
        ],
      );

      if (!result?.length) {
        throw new NotFoundException('Artist not found');
      }

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async deleteArtist(id: number, userId: number) {
    try {
      const result = await this.databaseService.query(
        `DELETE FROM artists WHERE id=$1 AND created_by=$2 RETURNING *`,
        [id, userId],
      );

      if (!result?.length) {
        throw new NotFoundException('Artist not found');
      }
      return { message: 'Artist deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException();
    }
  }
}
