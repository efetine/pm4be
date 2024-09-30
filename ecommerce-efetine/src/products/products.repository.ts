import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationsDTO } from '../dto/pagination.dto';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class productsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll({ limit = 5, page = 0 }: PaginationsDTO): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
      take: limit,
      skip: page * limit,
    });
    return products;
  }

  async create(body: CreateProductDto): Promise<Product> {
    const { categoryId, ...rest } = body;
    const product = this.productsRepository.create({
      ...rest,
      category: {
        id: categoryId,
      },
    });
    const newProduct = await this.productsRepository.save(product);
    return newProduct;
  }

  async findOne(id: Product['id']): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  async delete(id: Product['id']): Promise<void> {
    const product = await this.productsRepository.delete({
      id: id,
    });

    if (product.affected === 0) throw new NotFoundException();

    return;
  }

  async update(id: Product['id'], body: UpdateProductDto): Promise<void> {
    const product = await this.productsRepository.update(
      {
        id: id,
      },
      body,
    );
    if (product.affected === 0) throw new NotFoundException();

    return;
  }
}
