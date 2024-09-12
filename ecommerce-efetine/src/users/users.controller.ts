import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserOutput } from './interfaces/create-user-output';

@Controller('/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'create a user' })
  @ApiResponse({ status: 201, description: 'return a user' })
  async create(@Body() body: CreateUserDto): Promise<IUser> {
    return await this.usersService.create(body);
  }

  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'return all users' })
  async findAll(): Promise<UserOutput[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, description: 'return user by id' })
  async findOne(@Param('id') id: string): Promise<UserOutput> {
    return await this.usersService.findOne(+id);
  }

  @HttpCode(200)
  @Put(':id')
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: 200, description: 'return user' })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<IUser> {
    return await this.usersService.update(body, Number(id));
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({ summary: 'delete at user' })
  @ApiResponse({ status: 200, description: 'return ok' })
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.usersService.delete(+id);
  }
}
