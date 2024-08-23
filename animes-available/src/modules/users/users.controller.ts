import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { Public } from '../auth/auth.decorator';
import { InformacoesPessoaisDTO } from './dto/informacoesPessoais.dto';
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

  @HttpCode(HttpStatus.OK)
  @Patch(':id/perfil/informacaoPublica')
  async atualizarInformacaoDePublica(@Param('id') userID: string, @Body() data: InformacoesPublicasDTO) {
    return await this.usersService.setPublicInformation(parseInt(userID), data)
  }

  @Public()
  @Patch(':id/perfil/informacaoPessoal')
  async atualizarInformacaoPessoal(@Param('id') userID: string, @Body() data: InformacoesPessoaisDTO) {
    return await this.usersService.setPessoalInformation(parseInt(userID), data)
  }
}