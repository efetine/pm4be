import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsRepository } from './products.repository';
import { IProduct } from './interfaces/products.interfaces';
import { PaginationsDTO } from '../dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: productsRepository) {}
  async create(body: CreateProductDto): Promise<IProduct> {
    return await this.productsRepository.create(body);
  }

  async findAll(pagination: PaginationsDTO): Promise<IProduct[]> {
    return await this.productsRepository.findAll(pagination);
  }

  async findOne(id: IProduct['id']): Promise<IProduct> {
    return await this.productsRepository.findOne(id);
  }

  async update(id: IProduct['id'], body: UpdateProductDto): Promise<IProduct> {
    return await this.productsRepository.update(id, body);
  }

  async delete(id: IProduct['id']): Promise<boolean> {
    return await this.productsRepository.delete(id);
  }
}
