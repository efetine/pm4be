import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { LoginAuthDto } from '../auth/dto/login-auth.dto';
import { UserOutput } from './dto/create-user-output';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(body: CreateUserDto): Promise<UserOutput> {
    const { password, ...rest } = body; // rest operator
    const hashedPassword = await hash(password, 15);

    return this.usersRepository.create({
      ...rest, //spread operator
      password: hashedPassword,
    });
  }

  async findAll(): Promise<UserOutput[]> {
    return this.usersRepository.findAll();
  }

  async findOne(userId: string): Promise<UserOutput> {
    return this.usersRepository.findOne(userId);
  }

  async findOneByCred(login: LoginAuthDto): Promise<UserOutput> {
    return this.usersRepository.findOneByCred(login);
  }

  async update(body: UpdateUserDto, userId: string): Promise<void> {
    return this.usersRepository.update(body, userId);
  }

  async delete(userId: string): Promise<void> {
    return this.usersRepository.delete(userId);
  }
}
