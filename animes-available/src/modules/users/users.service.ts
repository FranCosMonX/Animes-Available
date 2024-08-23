import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { InformacoesPessoaisDTO } from './dto/informacoesPessoais.dto';
import { InformacoesPublicasDTO } from './dto/InformacoesPublicas.dto';
import { SenhaDTO } from './dto/Senha.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService, private authService: AuthService) { }

  async MyInformation(id: number) {

    const usuario = await this.prismaService.usuario.findFirst({
      where: { id }
    })

    if (!usuario) throw new BadRequestException("Id de usuário inválido. Erro na aplicação frontend.")

    return {
      usuario: this.removerDadosSensiveisOuNulos(usuario)
    }
  }

  async setPublicInformation(userID: number, data: InformacoesPublicasDTO) {
    if (!("hobby" in data) && !("jogo_preferido" in data) && !("anime_preferido" in data) && !("usuario" in data))
      throw new BadRequestException("É oborigatório que tenha ao menos um dos campos preenchidos: usuario, hobby, jogo_preferido ou anime_preferido")

    const usuario = await this.prismaService.usuario.update({
      where: { id: userID },
      data: data
    })

    return this.removerDadosSensiveisOuNulos(usuario)
  }

  async setPessoalInformation(userID: number, data: InformacoesPessoaisDTO) {
    if (!("email" in data) && !("nome_completo" in data))
      throw new BadRequestException("É oborigatório que tenha ao menos um dos campos preenchidos: email ou nome_completo")

    const usuarioEncontrado = await this.prismaService.usuario.findFirst({
      where: { id: userID }
    })

    const senhasIguais = await bcrypt.compare(data.senha, usuarioEncontrado.senha);
    if (!senhasIguais) throw new UnauthorizedException("Senha inválida")

    const dados = { email: data.email, nome_completo: data.nome_completo }
    const usuario = await this.prismaService.usuario.update({
      where: { id: userID },
      data: dados
    })

    return this.removerDadosSensiveisOuNulos(usuario)
  }

  async setPassword(userID: number, data: SenhaDTO) {
    const usuarioEncontrado = await this.prismaService.usuario.findFirst({
      where: { id: userID }
    })

    const senhasIguais = await bcrypt.compare(data.senha, usuarioEncontrado.senha);
    if (!senhasIguais) throw new UnauthorizedException({
      entidade: "senha",
      mensagem: "Senha original inválida."
    })

    const usuario = await this.prismaService.usuario.update({
      where: { id: userID },
      data: { senha: await this.authService.hashPassword(data.nova_senha) }
    })

    return this.removerDadosSensiveisOuNulos(usuario)
  }

  async deleteAccount(userID: number, password: string) {
    if (!password) throw new UnauthorizedException("É necessário informar a senha para realizar esta operação.");

    const usuario = await this.prismaService.usuario.findFirst({
      where: { id: userID }
    })

    const senhasIguais = await bcrypt.compare(password, usuario.senha);
    if (!senhasIguais) throw new UnauthorizedException("Senha inválida.")

    await this.prismaService.usuario.delete({
      where: { id: userID }
    })

    return { mensagem: "Conta excluída com sucesso." }
  }

  private removerDadosSensiveisOuNulos(dadosUsuario) {
    if (!dadosUsuario.anime_preferido) delete dadosUsuario.anime_preferido
    if (!dadosUsuario.jogo_preferido) delete dadosUsuario.jogo_preferido
    if (!dadosUsuario.hobby) delete dadosUsuario.hobby
    delete dadosUsuario.senha

    return dadosUsuario
  }
}
