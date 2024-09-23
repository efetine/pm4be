import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

import { LoginAuthDto } from '../auth/dto/login-auth.dto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutput } from './interfaces/create-user-output';
import { IUser } from './interfaces/user.interface';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<UserOutput[]> {
    const users = await this.usersRepository.find({
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        country: true,
        email: true,
        phone: true,
      },
    });

    return users;
  }

  async create(body: CreateUserDto): Promise<UserOutput> {
    const user = this.usersRepository.create(body);
    const newUser = await this.usersRepository.save(user);

    const { password, ...rest } = newUser;

    return rest;
  }
  async findOne(id: IUser['id']): Promise<UserOutput> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        country: true,
        email: true,
        phone: true,
      },
      relations: {
        orders: true,
      },
    });

    if (user === null) throw new NotFoundException();

    return user;
  }

  async findOneByCred(login: LoginAuthDto): Promise<UserOutput> {
    const user = await this.usersRepository.findOne({
      where: {
        email: login.email,
      },
    });

    if (user === null) throw new Error('User not found');

    const valid = await compare(login.password, user.password);

    if (valid === false) throw new Error('Password not valid');

    const { password, ...rest } = user;

    return rest;
  }

  async delete(id: IUser['id']): Promise<void> {
    const user = await this.usersRepository.delete({
      id: id,
    });

    if (user.affected === 0) throw new NotFoundException();

    return;
  }

  async update(body: UpdateUserDto, id: IUser['id']): Promise<UserOutput> {
    const user = await this.usersRepository.update(
      {
        id: id,
      },
      body,
    );

    if (user.affected === 0) throw new NotFoundException();

    return user.raw;
  }
}
