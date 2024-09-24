import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { OrderDetailsService } from '../order-details/order-details.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly ordersDetailsService: OrderDetailsService,
  ) {}
  async create(order: CreateOrderDto, userId: User['id']) {
    // Crear cada uno de los detalles de la orden
    const orderDetails = await this.ordersDetailsService.create(order);

    // Creamos la orden
    return await this.orderRepository.create({
      details: orderDetails,
      user: {
        id: userId,
      },
    });
  }

  findOne(id: Order['id']) {
    return `This action returns a #${id} order`;
  }
}
