import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { OrderDetail } from './entities/order-details.entity';
import { OrdersDetailsRepository } from './order-details.repository';
import { OrderDetailsService } from './order-details.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([OrderDetail])],
  providers: [OrderDetailsService, OrdersDetailsRepository],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
