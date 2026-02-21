import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDateString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsInt()
  @Min(1900)
  first_release_year: number;

  @IsInt()
  @Min(0)
  no_of_albums_released: number;
}
