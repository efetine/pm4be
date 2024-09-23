import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const orderEntity = this.ordersRepository.create(createOrderDto);
    const order = await this.ordersRepository.save(orderEntity);

    return order;
  }
}
