import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigsEnv } from '@/configs/env';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<AppConfigsEnv>) {}

  getFullUrlCloudinary(publicId: string) {
    const url = this.configService.get('CLOUDINARY_URL');
    const cloudName = this.configService.get('CLOUDINARY_NAME');
    const urlUpload = this.configService.get('CLOUDINARY_PATH_IMAGE_UPLOAD');

    return `${url}${cloudName}${urlUpload}/${publicId}`;
  }
}
