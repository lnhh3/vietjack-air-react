import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

import { MediaContentBuilder } from '@/schemas/builder/media-content.builder';
import { schemaOptions } from '@/shared/common/schema';
import { BaseDocumentType, BaseModelType, SystemStatus } from '@/types/common';
import { MediaContentType } from '@/types/media';

export type MediaContentDocument = BaseDocumentType<MediaContent>;
export type MediaContentModel = BaseModelType<MediaContent>;

@Schema({
  collection: 'media-content',
  ...schemaOptions,
})
export class MediaContent {
  @Prop({ type: MongooseSchema.ObjectId, ref: 'User' })
  createdByUserId: Types.ObjectId;

  @Prop({ type: String, required: true })
  publicId: string;

  @Prop({ enum: MediaContentType, required: true })
  type: MediaContentType;

  @Prop({ type: String, required: true })
  folder: string;

  @Prop({ enum: SystemStatus, required: true })
  systemStatus: SystemStatus;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  metadata: Record<string, any>;

  @Prop({ type: Date, default: Date.now })
  uploadedAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date | null;

  static get schema() {
    return SchemaFactory.createForClass(MediaContent);
  }

  static get model(): AsyncModelFactory {
    return {
      name: MediaContent.name,
      useFactory: () => {
        return this.schema;
      },
    };
  }

  static builder() {
    return new MediaContentBuilder();
  }
}
