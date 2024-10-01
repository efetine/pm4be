import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { IsAdminGuard } from '../auth/guard/is-admin.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(201)
  @Post()
  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a category' })
  @ApiCreatedResponse({
    description: 'A category created',
  })
  @ApiInternalServerErrorResponse()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get categories' })
  @ApiOkResponse({
    description: 'An array of categories',
    schema: {
      type: 'array',
    },
  })
  @ApiInternalServerErrorResponse()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a category' })
  @ApiOkResponse({
    description: 'A category object',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiInternalServerErrorResponse()
  @ApiParam({
    name: 'id',
    schema: {
      type: 'string',
    },
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: Category['id']) {
    const category = await this.categoriesService.findOne(id);

    if (category === null) {
      throw new NotFoundException();
    }

    return category;
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse({
    description: 'Updated category object',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiInternalServerErrorResponse()
  @ApiParam({
    name: 'id',
    schema: {
      type: 'string',
    },
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: Category['id'],
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse({
    description: 'Deleted category',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiInternalServerErrorResponse()
  @ApiParam({
    name: 'id',
    schema: {
      type: 'string',
    },
  })
  delete(@Param('id', new ParseUUIDPipe()) id: Category['id']) {
    return this.categoriesService.delete(id);
  }
}
