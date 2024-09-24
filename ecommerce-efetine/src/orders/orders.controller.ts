import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { JWTPayload } from '../auth/interfaces/jwt-payload';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: CreateOrderDto, @Req() request: Request) {
    // @ts-ignore
    const user = request['user'] as JWTPayload;
    return this.ordersService.create(body, user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: Order['id']) {
    return this.ordersService.findOne(id);
  }
}
