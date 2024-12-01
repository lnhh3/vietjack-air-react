import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MediaContentController } from '@/modules/media-content/media-content.controller';
import { MediaContentService } from '@/modules/media-content/media-content.service';
import { MediaContent } from '@/schemas/media-content.schema';
import { CloudinaryModule } from '@/shared/cloudinary/cloudinary.module';
import { LoggerModule } from '@/shared/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([MediaContent.model]),
    LoggerModule,
    CloudinaryModule,
  ],
  controllers: [MediaContentController],
  providers: [MediaContentService],
  exports: [MediaContentService],
})
export class MediaContentModule {}
