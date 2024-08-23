import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getMinhasInformacoes(@Param('id') userID: string) {
    return await this.usersService.MyInformation(parseInt(userID))
  }
}
