import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class BooksFilterDTO {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsInt()
  genreId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(new Date().getFullYear())
  publisherStartYear?: number;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(new Date().getFullYear())
  publisherEndYear?: number;
}
