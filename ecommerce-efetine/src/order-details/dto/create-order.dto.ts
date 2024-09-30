import { PickType } from '@nestjs/swagger';
import { OrderDetail } from '../entities/order-details.entity';

export class CreateOrderDetailDto extends PickType(OrderDetail, [
  'price',
  'product',
  'quantity',
] as const) {}
