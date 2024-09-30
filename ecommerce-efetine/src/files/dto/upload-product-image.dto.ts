import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

export class UploadProductImageDto {
  @ApiProperty()
  productId: Product['id'];
}
