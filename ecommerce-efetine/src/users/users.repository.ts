import { BadRequestException, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserOutput } from './interfaces/create-user-output';
@Injectable()
export class usersRepository {
  private users: IUser[] = [
    {
      id: 1,
      email: 'michael.scott@example.com',
      name: 'Michael Scott',
      password: 'dundermifflin123',
      address: '100 Paper St',
      phone: '+142536478',
      country: 'USA',
      city: 'Scranton',
    },
    {
      id: 2,
      email: 'pam.beesly@example.com',
      name: 'Pam Beesly',
      password: 'artislife789',
      address: '200 Art Ln',
      phone: '+987612345',
      country: 'USA',
      city: 'Scranton',
    },
    {
      id: 3,
      email: 'jim.halpert@example.com',
      name: 'Jim Halpert',
      password: 'bigTuna2021',
      address: '150 Sales Ave',
      phone: '+193847562',
      country: 'USA',
      city: 'Philadelphia',
    },
    {
      id: 4,
      email: 'dwight.schrute@example.com',
      name: 'Dwight Schrute',
      password: 'beetfarm456',
      address: '172 Schrute Farms',
      phone: '+564738291',
      country: 'USA',
      city: 'Scranton',
    },
  ];

  async findAll(): Promise<UserOutput[]> {
    const usersWithoutPasswords = this.users.map((user) => {
      const { password, ...rest } = user;

      return rest;
    });

    return usersWithoutPasswords;
  }

  async create(body: CreateUserDto): Promise<IUser> {
    const newUserId = this.users.length + 1;
    const newUser = { id: newUserId, ...body };
    this.users.push(newUser);
    return newUser;
  }
  async findOne(id: number): Promise<UserOutput> {
    const user = this.users.find((user) => user.id === id);

    if (user === undefined)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });

    const { password, ...rest } = user;

    // delete user.password;

    return rest;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });
    this.users.splice(index, 1);
    return true;
  }

  async update(body: UpdateUserDto, id: number): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });
    return (this.users[userIndex] = {
      ...this.users[userIndex],
      ...body,
    });
  }
}
