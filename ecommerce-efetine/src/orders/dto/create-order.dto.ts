import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { OrderDetailDto } from './order-detail-dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  details: OrderDetailDto[];
}
