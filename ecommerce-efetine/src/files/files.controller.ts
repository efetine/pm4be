import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from '../entities/product.entity';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/uploadImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('productId', new ParseUUIDPipe()) productId: Product['id'],
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // 200000 bytes = 200kb
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File, // Multer es un middleware para Express que te permite recibir archivos desde un FormData
  ) {
    return this.filesService.uploadProductImage(productId, file);
  }
}
