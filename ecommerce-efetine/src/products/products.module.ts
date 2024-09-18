import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductsController } from './products.controller';
import { productsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, productsRepository],
})
export class ProductsModule {}
