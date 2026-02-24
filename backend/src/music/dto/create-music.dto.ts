import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  Min,
  IsIn,
} from 'class-validator';
export class CreateMusicDto {
  @IsInt()
  @Min(1)
  artist_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  album_name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['rnb', 'country', 'classic', 'rock', 'jazz', 'pop'])
  genre?: string;
}
