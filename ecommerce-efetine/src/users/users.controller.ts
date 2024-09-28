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
  getSchemaPath,
} from '@nestjs/swagger';

import { IsAdminGuard } from '../auth/guard/is-admin.guard';
import { User } from '../entities/user.entity';
import { UserOutput } from './dto/create-user-output';
import { UserByIdDTO } from './dto/id-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(IsAdminGuard)
  @HttpCode(200)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'An array of users',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(User),
      },
    },
  })
  @ApiInternalServerErrorResponse()
  async findAll(): Promise<UserOutput[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    description: 'A specific user',
    schema: {
      $ref: getSchemaPath(User),
    },
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
    @Param('id', new ParseUUIDPipe()) id: UserByIdDTO,
  ): Promise<UserOutput> {
    return await this.usersService.findOne(id);
  }

  @HttpCode(200)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({
    description: 'User updated',
    schema: {
      $ref: getSchemaPath(User),
    },
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
    @Param('id', new ParseUUIDPipe()) id: UserByIdDTO,
    @Body() body: UpdateUserDto,
  ): Promise<UserOutput> {
    return await this.usersService.update(body, id);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiBearerAuth()
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
  async delete(
    @Param('id', new ParseUUIDPipe()) id: UserByIdDTO,
  ): Promise<void> {
    return await this.usersService.delete(id);
  }
}
