import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsRepository } from './products.repository';
import { IProduct } from './interfaces/products.interfaces';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: productsRepository) {}
  async create(body: CreateProductDto): Promise<IProduct> {
    return await this.productsRepository.create(body);
  }

  async findAll(): Promise<IProduct[]> {
    return await this.productsRepository.findAll();
  }

  async findOne(id: number): Promise<IProduct> {
    return await this.productsRepository.findOne(id);
  }

  async update(id: number, body: UpdateProductDto): Promise<IProduct> {
    return await this.productsRepository.update(id, body);
  }

  async delete(id: number): Promise<boolean> {
    return await this.productsRepository.delete(id);
  }
}
