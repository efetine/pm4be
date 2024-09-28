import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../entities/product.entity';

export class UploadProductImageDto {
  @ApiProperty()
  productId: Product['id'];
}
