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

    delete usuario.senha

    return {
      usuario
    }
  }
}
