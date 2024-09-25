import { Module } from '@nestjs/common';

import { CloudinaryConfig } from '../config/cloudinary';
import { ProductsModule } from '../products/products.module';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { FilesService } from './files.service';

@Module({
  imports: [ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, CloudinaryConfig],
})
export class FilesModule {}
