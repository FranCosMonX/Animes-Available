import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CadastroDTO } from './dto/cadastro.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  /**
   * Método para registrar as informações do usuário no banco de dados
   * @param data dados do usuário
   */
  async cadastro(data: CadastroDTO) {
    const { email, usuario, nome_completo, senha } = data

    const usuario_com_email = await this.prisma.usuario.findFirst({
      where: { email }
    })
    const nome_usuario_existente = await this.prisma.usuario.findFirst({
      where: { usuario }
    })

    if (usuario_com_email) throw new BadRequestException("Já existe um usuário com este email.")
    if (nome_usuario_existente) throw new BadRequestException("Já existe um usuário com este nome de usuário.")


    const senhaCriptografada = await this.hashPassword(senha)
    const resultado = await this.prisma.usuario.create({
      data: { usuario, email, nome_completo, senha: senhaCriptografada }
    })

    return {
      usuario: resultado,
      mensagem: "Cadastro realizado com sucesso"
    }
  }

  /**
   * Metodo para criptografar os dados a serem enviados para o BD
   * @param password criptografada
   * @returns 
   */
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }
}
