import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CadastroDTO } from './dto/cadastro.dto';
import { loginDTO } from './dto/login.dto';

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
      data: { usuario, email, nome_completo, senha: senhaCriptografada },
      select: { id: true, usuario: true, email: true, nome_completo: true, updatedAt: true, createdAt: true }
    })

    return {
      usuario: resultado,
      mensagem: "Cadastro realizado com sucesso"
    }
  }

  /**
   * Método para logar o usuário na aplicação
   * @param data dados do usuário
   * @returns 
   */
  async login(data: loginDTO) {
    const { usuario, senha } = data

    const usuarioExiste = await this.prisma.usuario.findFirst({
      where: { usuario }
    })
    const senhasIguais = await bcrypt.compare(senha, usuarioExiste.senha);

    if (!usuarioExiste || !senhasIguais) throw new BadRequestException("Credenciais inválidas");

    return {
      mensagem: "Login bem sucedido",
      user: {
        id: usuarioExiste.id,
        token: "token"
      }
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
