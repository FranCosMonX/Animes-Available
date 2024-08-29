import { IsOptional, IsString } from "class-validator";

export class InformacoesPublicasDTO {

  @IsOptional()
  @IsString()
  readonly anime_preferido: string;

  @IsOptional()
  @IsString()
  readonly jogo_preferido: string;

  @IsOptional()
  @IsString()
  readonly hobby: string;

  @IsOptional()
  @IsString()
  readonly usuario: string;
}