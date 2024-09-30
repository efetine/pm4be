import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserOutput } from '../users/dto/create-user-output';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../utils/public.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenDTO } from './dto/token-dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('/login') //sign in
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({
    description: 'The user token',
  })
  @ApiUnauthorizedResponse({
    description: "Email doesn't exist or password is incorrect",
  })
  @ApiInternalServerErrorResponse()
  async login(@Body() body: LoginAuthDto): Promise<TokenDTO> {
    return this.authService.login(body);
  }

  @Public()
  @HttpCode(201)
  @Post('/register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiOkResponse({
    description: 'The user is registered',
  })
  @ApiBadRequestResponse({
    description: 'User could not be registered',
  })
  @ApiInternalServerErrorResponse()
  async create(@Body() body: CreateUserDto): Promise<UserOutput> {
    return await this.authService.create(body);
  }
}
