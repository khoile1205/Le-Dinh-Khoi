import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1000)
  @Max(9999)
  publishedYear: number;

  @IsNumber()
  @IsNotEmpty()
  genre: number;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  language: string;
}
