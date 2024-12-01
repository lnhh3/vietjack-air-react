import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinaryIm } from 'cloudinary';

import { AppConfigsEnv } from '@/configs/env';
import { LoggerService } from '@/shared/logger/logger.service';

import { CloudinaryResponse } from './response';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinary: typeof cloudinaryIm,
    private readonly logger: LoggerService,
    private configService: ConfigService<AppConfigsEnv>,
  ) {}

  uploadFile(
    file: Express.Multer.File,
    folder = this.configService.get<string>('CLOUDINARY_FOLDER_COMMON'),
  ): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: folder,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as any);
          },
        )
        .end(file.buffer);
    });
  }
}
