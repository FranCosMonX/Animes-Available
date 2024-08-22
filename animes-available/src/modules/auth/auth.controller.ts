import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { CadastroDTO } from './dto/cadastro.dto';
import { loginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('cadastrar')
  async cadastrar(@Body() dataDto: CadastroDTO) {
    return await this.authService.cadastro(dataDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() dataDto: loginDTO) {
    return await this.authService.login(dataDto);
  }
}
