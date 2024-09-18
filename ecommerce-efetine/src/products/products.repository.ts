import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationsDTO } from '../dto/pagination.dto';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/products.interfaces';

@Injectable()
export class productsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(pagination: PaginationsDTO): Promise<IProduct[]> {
    const products = await this.productsRepository.find();
    return products;
  }

  async create(body: CreateProductDto): Promise<IProduct> {
    const product = this.productsRepository.create(body);
    const newProduct = await this.productsRepository.save(product);
    return newProduct;
  }

  async findOne(id: IProduct['id']): Promise<IProduct> {
    const product = await this.productsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!product)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });

    return product;
  }

  async delete(id: IProduct['id']): Promise<void> {
    const product = await this.productsRepository.delete({
      id: id,
    });

    if (product.affected === 0)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });

    return;
  }

  async update(id: IProduct['id'], body: UpdateProductDto): Promise<IProduct> {
    const product = await this.productsRepository.update(
      {
        id: id,
      },
      body,
    );
    if (product.affected === 0)
      throw new BadRequestException({
        statusCode: 404,
        message: 'bad request',
      });

    return product.raw;
  }
}
