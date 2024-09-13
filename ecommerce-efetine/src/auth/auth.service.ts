import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async login(body: LoginAuthDto): Promise<boolean> {
    return await this.authRepository.login(body);
  }
}
