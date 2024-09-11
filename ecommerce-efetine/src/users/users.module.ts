import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersRepository],
})
export class UsersModule {}
