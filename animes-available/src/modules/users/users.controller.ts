import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { Public } from '../auth/auth.decorator';
import { InformacoesPublicasDTO } from './dto/InformacoesPublicas.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getMinhasInformacoes(@Param('id') userID: string) {
    return await this.usersService.MyInformation(parseInt(userID))
  }

  @Public()
  @Patch(':id/perfil/informacaoPublica')
  async atualizarInformacaoDePerfil(@Param('id') userID: string, @Body() data: InformacoesPublicasDTO) {
    return await this.usersService.setPublicInformation(parseInt(userID), data)
  }
}