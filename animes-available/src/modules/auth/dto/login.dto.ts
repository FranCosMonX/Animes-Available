import { IsNotEmpty, IsString, Length } from "class-validator";

export class loginDTO {
  @IsNotEmpty({ message: "Campo obrigatório" })
  @IsString({ message: "O nome de usuário deve ser uma String" })
  @Length(1, 20, { message: "O nome de usuário deve conter entre 1 e 20 caracteres" })
  readonly usuario: string;

  @IsNotEmpty({ message: "Campo obrigatório" })
  @IsString({ message: "A senha deve ser uma String" })
  @Length(5, 20, { message: "A senha deve conter entre 5 e 20 caracteres" })
  readonly senha: string;
}