import { IsNotEmpty, IsString } from "class-validator";

export class SenhaDTO {
  @IsString({ message: "O parâmetro senha tem que ser uma string" })
  @IsNotEmpty({ message: "Senha necessária." })
  readonly senha: string;

  @IsString({ message: "O parâmetro nova_senha tem que ser uma string" })
  @IsNotEmpty({ message: "Nova senha necessária para completar a atualização." })
  readonly nova_senha: string;
}