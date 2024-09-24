import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { ProductsService } from '../products/products.service';
import { OrdersDetailsRepository } from './order-details.repository';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ordersDetailsRepository: OrdersDetailsRepository,
  ) {}
  async create(order: CreateOrderDto) {
    const orderDetails = [];
    for (const detail of order.details) {
      const product = await this.productsService.findOne(detail.product);
      const orderDetail = this.ordersDetailsRepository.create({
        price: product.price,
        product,
        quantity: detail.quantity,
      });
      orderDetails.push(orderDetail);
    }
    return orderDetails;
  }
}
