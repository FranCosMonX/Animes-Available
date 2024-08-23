import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  async MyInformation(id: number) {

    const usuario = await this.prismaService.usuario.findFirst({
      where: { id }
    })

    if (!usuario) throw new BadRequestException("Id de usuário inválido. Erro na aplicação frontend.")

    if (!usuario.anime_preferido) delete usuario.anime_preferido
    if (!usuario.jogo_preferido) delete usuario.jogo_preferido
    if (!usuario.hobby) delete usuario.hobby
    delete usuario.senha

    return {
      usuario
    }
  }
}
