import { OrderDetail } from '../../entities/order-details.entity';

export class CreateOrderDto {
  details: Pick<OrderDetail, 'quantity' | 'product'>[];
}
