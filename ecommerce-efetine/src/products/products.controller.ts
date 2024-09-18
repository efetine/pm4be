import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationsDTO } from '../dto/pagination.dto';
import { Public } from '../utils/public.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/products.interfaces';
import { ProductsService } from './products.service';

@Controller('/products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'create a product' })
  @ApiResponse({ status: 201, description: 'create a product' })
  async create(@Body() body: CreateProductDto): Promise<IProduct> {
    return await this.productsService.create(body);
  }

  @Public()
  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'return all products' })
  async findAll(@Query() query: PaginationsDTO): Promise<IProduct[]> {
    const { page = 0, limit = 5 } = query;

    return await this.productsService.findAll({ page, limit });
  }

  @Public()
  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Get product' })
  @ApiResponse({ status: 200, description: 'return product by id' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: IProduct['id'],
  ): Promise<IProduct> {
    return await this.productsService.findOne(id);
  }

  @HttpCode(200)
  @Put(':id')
  @ApiOperation({ summary: 'update product' })
  @ApiResponse({ status: 200, description: 'return product' })
  async update(
    @Param('id', ParseUUIDPipe) id: IProduct['id'],
    @Body() body: UpdateProductDto,
  ): Promise<IProduct> {
    return await this.productsService.update(id, body);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({ summary: 'delete at product' })
  @ApiResponse({ status: 200, description: 'return ok' })
  async delete(@Param('id', ParseUUIDPipe) id: IProduct['id']): Promise<void> {
    try {
      return this.productsService.delete(id);
    } catch {
      throw new Error('Cannot delete user');
    }
  }
}
