import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CadastroDTO {
  @IsNotEmpty({ message: "Campo obrigatório" })
  @IsString({ message: "O Nome Completo deve ser uma String" })
  @Length(1, 100, { message: "O nome completo deve conter entre 1 e 150 caracteres" })
  readonly nome_completo: string;

  @IsNotEmpty({ message: "Campo obrigatório" })
  @IsString({ message: "O nome de usuário deve ser uma String" })
  @Length(1, 20, { message: "O nome de usuário deve conter entre 1 e 20 caracteres" })
  readonly usuario: string;

  @IsNotEmpty({ message: "Campo obrigatório" })
  @IsEmail({}, { message: "Email deve ser um Email válido sintaticamente" })
  readonly email: string;

  @IsNotEmpty({ message: "Campo obrigatório" })
  @IsString({ message: "A senha deve ser uma String" })
  @Length(5, 20, { message: "A senha deve conter entre 5 e 20 caracteres" })
  readonly senha: string;
}
