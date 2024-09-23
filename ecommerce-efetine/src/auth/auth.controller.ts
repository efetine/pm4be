import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserOutput } from '../users/interfaces/create-user-output';
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

  @Public()
  @HttpCode(201)
  @Post('/register')
  @ApiOperation({ summary: 'create a user' })
  @ApiResponse({ status: 201, description: 'return a user' })
  async create(@Body() body: CreateUserDto): Promise<UserOutput> {
    return await this.authService.create(body);
  }
}
