import { IsString, IsInt, IsOptional, Min, IsIn } from 'class-validator';

export class UpdateMusicDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  artist_id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  album_name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['rnb', 'country', 'classic', 'rock', 'jazz'])
  genre?: string;
}
