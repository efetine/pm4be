import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { OrderDetail } from '../../order-details/entities/order-details.entity';

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
    type: 'string',
    example: '07ddc283-0b1d-463a-acd1-74e43b67a60f',
  })
  product: OrderDetail['product']['id'];
}
