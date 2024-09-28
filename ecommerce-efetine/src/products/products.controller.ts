import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationsDTO } from '../dto/pagination.dto';
import { Product } from '../entities/product.entity';
import { Public } from '../utils/public.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/products.interfaces';
import { ProductsService } from './products.service';

@Controller('/products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(201)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({
    description: 'Product created',
    schema: {
      $ref: getSchemaPath(Product),
    },
  })
  @ApiInternalServerErrorResponse()
  async create(@Body() body: CreateProductDto): Promise<IProduct> {
    return await this.productsService.create(body);
  }

  @Public()
  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    description: 'An array of products',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(Product),
      },
    },
  })
  @ApiInternalServerErrorResponse()
  async findAll(@Query() query: PaginationsDTO): Promise<IProduct[]> {
    const { page = 0, limit = 5 } = query;

    return await this.productsService.findAll({ page, limit });
  }

  @Public()
  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Get a product' })
  @ApiOkResponse({
    description: 'A specific product',
    schema: {
      $ref: getSchemaPath(Product),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @ApiInternalServerErrorResponse()
  @ApiParam({
    name: 'id',
    description: 'product id',
    schema: {
      type: 'string',
    },
  })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: IProduct['id'],
  ): Promise<IProduct> {
    return await this.productsService.findOne(id);
  }

  @HttpCode(200)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({
    description: 'Product updated',
    schema: {
      $ref: getSchemaPath(Product),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @ApiInternalServerErrorResponse()
  @ApiParam({
    name: 'id',
    description: 'product id',
    schema: {
      type: 'string',
    },
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: IProduct['id'],
    @Body() body: UpdateProductDto,
  ): Promise<IProduct> {
    return await this.productsService.update(id, body);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiOkResponse({
    description: 'Product deleted',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @ApiInternalServerErrorResponse()
  @ApiParam({
    name: 'id',
    description: 'product id',
    schema: {
      type: 'string',
    },
  })
  async delete(
    @Param('id', new ParseUUIDPipe()) id: IProduct['id'],
  ): Promise<void> {
    try {
      return this.productsService.delete(id);
    } catch {
      throw new InternalServerErrorException('Cannot delete user');
    }
  }
}
