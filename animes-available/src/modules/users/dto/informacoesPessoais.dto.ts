import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InformacoesPessoaisDTO {
  @IsOptional()
  @IsString({ message: "O parâmetro nome_completo tem que ser uma string" })
  readonly nome_completo: string;

  @IsOptional()
  @IsString({ message: "O parâmetro email tem que ser uma string" })
  @IsEmail({}, { message: "Email deve ser um Email válido sintaticamente" })
  readonly email: string;

  @IsString({ message: "O parâmetro senha tem que ser uma string" })
  @IsNotEmpty({ message: "Senha necessária." })
  readonly senha: string;
}