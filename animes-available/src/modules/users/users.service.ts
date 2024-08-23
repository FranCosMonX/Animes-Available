import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InformacoesPublicasDTO } from './dto/InformacoesPublicas.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

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

  private removerDadosSensiveisOuNulos(dadosUsuario) {
    if (!dadosUsuario.anime_preferido) delete dadosUsuario.anime_preferido
    if (!dadosUsuario.jogo_preferido) delete dadosUsuario.jogo_preferido
    if (!dadosUsuario.hobby) delete dadosUsuario.hobby
    delete dadosUsuario.senha

    return dadosUsuario
  }
}
