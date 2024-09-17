import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutput } from './interfaces/create-user-output';
import { IUser } from './interfaces/user.interface';
import { usersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: usersRepository) {}
  async create(body: CreateUserDto): Promise<UserOutput> {
    const { password, address, city, country, email, name, phone } = body;
    const hashedPassword = await bcrypt.hash(password, 15);

    return this.usersRepository.create({
      address,
      city,
      country,
      email,
      name,
      phone,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<UserOutput[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: IUser['id']): Promise<UserOutput> {
    return this.usersRepository.findOne(id);
  }

  async update(body: UpdateUserDto, id: IUser['id']): Promise<UserOutput> {
    return await this.usersRepository.update(body, id);
  }

  async delete(id: IUser['id']): Promise<void> {
    return this.usersRepository.delete(id);
  }
}
