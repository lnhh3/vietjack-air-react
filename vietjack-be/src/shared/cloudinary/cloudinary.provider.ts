import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as CloudinaryAPI } from 'cloudinary';

import { AppConfigsEnv } from '@/configs/env';

export const CLOUDINARY = 'CLOUDINARY';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService<AppConfigsEnv>) => {
    CloudinaryAPI.config({
      cloud_name: configService.get<string>('CLOUDINARY_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
    return CloudinaryAPI;
  },
  inject: [ConfigService],
};
