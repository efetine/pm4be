import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../utils/public.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenDTO } from './dto/token-dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login') //sign in
  async login(@Body() body: LoginAuthDto): Promise<TokenDTO> {
    return this.authService.login(body);
  }
}
