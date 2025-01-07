import { IsOptional, IsString } from "class-validator";

export class UpdateGenreDTO {
  @IsString()
  @IsOptional()
  name?: string;
}
