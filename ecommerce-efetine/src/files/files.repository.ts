import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FilesRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (result !== undefined) {
            resolve(result);
          }

          reject(error);
        },
      );

      // Esto convierte el archivo a un buffer a un stream para poder subirlo a Cloudinary
      const stream = Readable.from(file.buffer);
      stream.pipe(upload);
    });
  }
}
