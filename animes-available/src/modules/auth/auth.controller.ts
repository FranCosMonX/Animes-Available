import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CadastroDTO } from './dto/cadastro.dto';
import { loginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('cadastrar')
  async cadastrar(@Body() dataDto: CadastroDTO) {
    return await this.authService.cadastro(dataDto);
  }

  @Post('login')
  async login(@Body() dataDto: loginDTO) {
    return await this.authService.login(dataDto);
  }
}
