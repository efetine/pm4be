import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { ProductsService } from '../products/products.service';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(
    private filesRepository: FilesRepository,
    private productsService: ProductsService,
  ) {}
  async uploadProductImage(
    productId: Product['id'],
    file: Express.Multer.File,
  ) {
    // Chequeo si el producto existe
    await this.productsService.findOne(productId);

    let result = null;

    // Sube la imagen a Cloudinary
    try {
      result = await this.filesRepository.uploadImage(file);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    // Actualizo la imagen de mi producto
    const imgUrl = result.secure_url;
    try {
      await this.productsService.update(productId, {
        imgUrl,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return {
      imgUrl,
    };
  }
}
