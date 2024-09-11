import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
@Injectable()
export class usersRepository {
  private users = [
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

  findAll(): IUser[] {
    return this.users;
  }
}
