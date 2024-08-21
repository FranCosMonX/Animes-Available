import { Body, Controller, Get } from '@nestjs/common';
import { CadastroDTO } from './dto/cadastro.dto';
import { loginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  @Get('cadastrar')
  async cadastrar(@Body() dataDto: CadastroDTO) {
    return {
      data: dataDto,
      message: "Usuário cadastrado com sucesso!"
    }
  }

  @Get('login')
  async login(@Body() dataDto: loginDTO) {
    return {
      data: dataDto,
      message: "Usuário logado com sucesso!"
    }
  }
}
