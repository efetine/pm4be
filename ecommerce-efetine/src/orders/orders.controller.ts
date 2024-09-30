import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { JWTPayload } from '../auth/interfaces/jwt-payload';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Order created',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @ApiInternalServerErrorResponse()
  async create(
    @Body() body: CreateOrderDto,
    @Req() request: Request,
  ): Promise<{ order: Order; total: number }> {
    // @ts-ignore
    const user = request['user'] as JWTPayload;
    return await this.ordersService.create(body, user.sub);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'order id',
    schema: {
      type: 'string',
    },
    example: 'd3c314ea-8628-4942-ab78-20e8aee05a96',
  })
  @ApiOkResponse({
    description: 'An order',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
  })
  @ApiInternalServerErrorResponse()
  async findOne(@Param('id', new ParseUUIDPipe()) id: Order['id']) {
    return this.ordersService.findOne(id);
  }
}
