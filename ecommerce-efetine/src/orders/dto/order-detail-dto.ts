import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { OrderDetail } from '../../entities/order-details.entity';
import { Product } from '../../entities/product.entity';

export class OrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: 'number',
    minimum: 1,
  })
  quantity: OrderDetail['quantity'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: Product,
  })
  product: OrderDetail['product']['id'];
}
