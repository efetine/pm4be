import { Injectable } from '@nestjs/common';

import { usersRepository } from './users.repository';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutput } from './interfaces/create-user-output';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: usersRepository) {}
  async create(body: CreateUserDto): Promise<IUser> {
    return this.usersRepository.create(body);
  }

  async findAll(): Promise<UserOutput[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: IUser['id']): Promise<UserOutput> {
    return this.usersRepository.findOne(id);
  }

  async update(body: UpdateUserDto, id: IUser['id']): Promise<IUser> {
    return await this.usersRepository.update(body, id);
  }

  async delete(id: IUser['id']): Promise<boolean> {
    return this.usersRepository.delete(id);
  }
}
