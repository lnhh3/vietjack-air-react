import { Module } from '@nestjs/common';

import { CloudinaryProvider } from '@/shared/cloudinary/cloudinary.provider';
import { CloudinaryService } from '@/shared/cloudinary/cloudinary.service';
import { LoggerModule } from '@/shared/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
