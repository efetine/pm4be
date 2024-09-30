import { Injectable } from '@nestjs/common';

import { OrderDetailsService } from '../order-details/order-details.service';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly ordersDetailsService: OrderDetailsService,
  ) {}
  async create(
    order: CreateOrderDto,
    userId: User['id'],
  ): Promise<{ order: Order; total: number }> {
    // Crear cada uno de los detalles de la orden
    const orderDetails = await this.ordersDetailsService.create(order);

    // Creamos la orden
    return await this.orderRepository.create(orderDetails, userId);
  }

  async findOne(id: Order['id']) {
    return this.orderRepository.findOne(id);
  }
}
