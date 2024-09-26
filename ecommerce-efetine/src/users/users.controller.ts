import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from '../auth/guard/is-admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutput } from './interfaces/create-user-output';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Public()
  // @HttpCode(201)
  // @Post()
  // @ApiOperation({ summary: 'create a user' })
  // @ApiResponse({ status: 201, description: 'return a user' })
  // async create(@Body() body: CreateUserDto): Promise<UserOutput> {
  //   return await this.usersService.create(body);
  // }

  // @UseGuards(AuthGuard)
  @UseGuards(IsAdminGuard)
  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'return all users' })
  async findAll(): Promise<UserOutput[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'return user by id' })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: IUser['id'],
  ): Promise<UserOutput> {
    return await this.usersService.findOne(id);
  }

  @HttpCode(200)
  @Patch(':id')
  @ApiOperation({ summary: 'update user by id' })
  @ApiResponse({ status: 200, description: 'return user' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: IUser['id'],
    @Body() body: UpdateUserDto,
  ): Promise<UserOutput> {
    return await this.usersService.update(body, id);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({ summary: 'delete at user by id' })
  @ApiResponse({ status: 200, description: 'return ok' })
  async delete(
    @Param('id', new ParseUUIDPipe()) id: IUser['id'],
  ): Promise<void> {
    return await this.usersService.delete(id);
  }
}
