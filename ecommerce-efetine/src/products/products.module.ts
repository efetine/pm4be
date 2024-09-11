import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, productsRepository],
})
export class ProductsModule {}
