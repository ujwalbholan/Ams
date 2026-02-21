import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/artist.create.dto';
import { UpdateArtistDto } from './dto/artist.update.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly databaseServioce: DatabaseService) {}

  async getAllArtist(page, limit) {
    const offset = (page - 1) * limit;

    const data = await this.databaseServioce.query(
      `SELECT * FROM artists
       ORDER BY id DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const total = await this.databaseServioce.query(
      `SELECT COUNT(*) FROM artists`,
    );

    return {
      total: Number(total[0].count),
      page,
      limit,
      data,
    };
  }
}
