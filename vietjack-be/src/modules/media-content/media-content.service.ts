import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import {
  MediaContent,
  MediaContentDocument,
  MediaContentModel,
} from '@/schemas/media-content.schema';
import { SystemStatus } from '@/types/common';

@Injectable()
export class MediaContentService {
  constructor(
    @InjectModel(MediaContent.name)
    private mediaContentModel: MediaContentModel,
  ) {}

  async create(mediaContent: MediaContent): Promise<MediaContentDocument> {
    const res = await this.mediaContentModel.create(mediaContent);
    await res.save();
    return res;
  }

  async getPagingImages(userId: string): Promise<MediaContentDocument[]> {
    return this.mediaContentModel.find({
      createdByUserId: new Types.ObjectId(userId),
      systemStatus: SystemStatus.ACTIVE,
    });
  }
}
