import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenDTO } from './dto/token-dto';
import { JWTPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(login: LoginAuthDto): Promise<TokenDTO> {
    const user = await this.usersService.findOneByCred(login);

    const payload: JWTPayload = {
      sub: user.id,
      username: user.name,
      role: user.admin === true ? 'ADMIN' : 'USER',
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
