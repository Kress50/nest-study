import { IsString } from 'class-validator';
import {
  IsNumber,
  IsOptional,
} from 'class-validator/types/decorator/decorators';

export class createMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genre: string[];
}
