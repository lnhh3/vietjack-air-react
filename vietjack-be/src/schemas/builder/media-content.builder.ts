import { Types } from 'mongoose';

import { MediaContent } from '@/schemas/media-content.schema';
import { SystemStatus } from '@/types/common';
import { MediaContentType } from '@/types/media';

export class MediaContentBuilder {
  private readonly instance: MediaContent;

  constructor() {
    this.instance = new MediaContent();
  }

  createdByUserId(userId: Types.ObjectId) {
    this.instance.createdByUserId = userId;
    return this;
  }

  publicId(publicId: string) {
    this.instance.publicId = publicId;
    return this;
  }

  type(type: MediaContentType) {
    this.instance.type = type;
    return this;
  }

  folder(folder: string) {
    this.instance.folder = folder;
    return this;
  }

  systemStatus(status: SystemStatus) {
    this.instance.systemStatus = status;
    return this;
  }

  metadata(data: Record<string, any>) {
    this.instance.metadata = data;
    return this;
  }

  uploadedAt(date: Date) {
    this.instance.uploadedAt = date;
    return this;
  }

  updatedAt(date: Date) {
    this.instance.updatedAt = date;
    return this;
  }

  build() {
    return this.instance;
  }
}
