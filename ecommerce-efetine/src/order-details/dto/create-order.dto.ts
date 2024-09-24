import { OrderDetail } from '../../entities/order-details.entity';

export type CreateOrderDetailDto = Pick<
  OrderDetail,
  'price' | 'product' | 'quantity'
>;
