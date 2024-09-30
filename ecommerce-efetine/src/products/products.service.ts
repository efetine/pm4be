import { Injectable } from '@nestjs/common';

import { PaginationsDTO } from '../dto/pagination.dto';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: productsRepository) {}
  async create(body: CreateProductDto): Promise<Product> {
    return await this.productsRepository.create(body);
  }

  async findAll(pagination: PaginationsDTO): Promise<Product[]> {
    return await this.productsRepository.findAll(pagination);
  }

  async findOne(id: Product['id']): Promise<Product> {
    return await this.productsRepository.findOne(id);
  }

  async update(id: Product['id'], body: UpdateProductDto): Promise<void> {
    return this.productsRepository.update(id, body);
  }

  async delete(id: Product['id']): Promise<void> {
    return await this.productsRepository.delete(id);
  }
}
