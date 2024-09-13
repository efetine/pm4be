import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IAuth } from './interfaces/auth.interface';

@Injectable()
export class AuthRepository {
  private authUser: IAuth[] = [
    {
      id: 1,
      email: 'michael.scott@example.com',
      password: 'dundermifflin123',
    },
    {
      id: 2,
      email: 'pam.beesly@example.com',
      password: 'artislife789',
    },
  ];
  async login(body: LoginAuthDto): Promise<boolean> {
    // const authUser = this.authUser.find(authUser);
    return true;
  }
}
