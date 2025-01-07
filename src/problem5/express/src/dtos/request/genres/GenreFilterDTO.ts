import { IsOptional, IsString } from "class-validator";

export class GenreFilterDTO {
  @IsString()
  @IsOptional()
  name?: string;
}
