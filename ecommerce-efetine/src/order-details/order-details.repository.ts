import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from '../entities/order-details.entity';
import { CreateOrderDetailDto } from './dto/create-order.dto';

@Injectable()
export class OrdersDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private ordersDetailsRepository: Repository<OrderDetail>,
  ) {}

  create(detail: CreateOrderDetailDto) {
    const orderDetail = this.ordersDetailsRepository.create(detail);
    return orderDetail;
  }
}
