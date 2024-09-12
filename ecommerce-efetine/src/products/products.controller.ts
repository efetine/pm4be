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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/products.interfaces';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'return all products' })
  async findAll(): Promise<IProduct[]> {
    return await this.productsService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Get product' })
  @ApiResponse({ status: 200, description: 'return product by id' })
  async findOne(@Param('id') id: string): Promise<IProduct> {
    return await this.productsService.findOne(+id);
  }

  @HttpCode(200)
  @Put(':id')
  @ApiOperation({ summary: 'update product' })
  @ApiResponse({ status: 200, description: 'return product' })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<IProduct> {
    return await this.productsService.update(+id, body);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({ summary: 'delete at product' })
  @ApiResponse({ status: 200, description: 'return ok' })
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.productsService.delete(+id);
  }
}
