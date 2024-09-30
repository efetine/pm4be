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
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { IsAdminGuard } from '../auth/guard/is-admin.guard';
import { UserOutput } from './dto/create-user-output';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(IsAdminGuard)
  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'An array of users',
    schema: {
      type: 'array',
    },
  })
  @ApiInternalServerErrorResponse()
  async findAll(): Promise<UserOutput[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    description: 'A specific user',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiInternalServerErrorResponse()
  @ApiParam({
    name: 'id',
    description: 'user id',
    schema: {
      type: 'string',
    },
  })
  async findOne(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<UserOutput> {
    return await this.usersService.findOne(userId);
  }

  @HttpCode(200)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({
    description: 'User updated',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiParam({
    name: 'id',
    description: 'user id',
    schema: {
      type: 'string',
    },
  })
  async update(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.update(body, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiOkResponse({
    description: 'User deleted',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiParam({
    name: 'id',
    description: 'user id',
    schema: {
      type: 'string',
    },
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
