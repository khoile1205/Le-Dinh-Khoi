import { IsString, IsNumber, Min, Max, IsOptional } from "class-validator";

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1000)
  @Max(9999)
  @IsOptional()
  publishedYear?: number;

  @IsNumber()
  @IsOptional()
  genre?: number;

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsString()
  @IsOptional()
  language?: string;
}
