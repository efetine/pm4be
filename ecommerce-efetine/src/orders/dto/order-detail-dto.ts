import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { OrderDetail } from '../../entities/order-details.entity';

export class OrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: OrderDetail['quantity'];

  @IsNotEmpty()
  @IsString()
  product: OrderDetail['product']['id'];
}
