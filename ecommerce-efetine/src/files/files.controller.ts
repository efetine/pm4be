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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Product } from '../products/entities/product.entity';
import { FilesService } from './files.service';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/uploadImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiParam({
    name: 'productId',
    schema: {
      type: 'string',
    },
    example: '8d3b86a1-14a7-4715-bff6-c95cbd15b960',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Product image uploaded',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @ApiInternalServerErrorResponse()
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
