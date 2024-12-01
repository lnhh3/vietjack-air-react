import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

import { schemaOptions } from '@/shared/common/schema';
import { SchemaObjectId } from '@/types/common';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;
export type RefreshTokenModel = Model<RefreshToken>;

@Schema({
  collection: 'refresh-token',
  ...schemaOptions,
})
export class RefreshToken {
  @Prop({
    type: SchemaObjectId,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  refreshToken: string;

  static get schema() {
    return SchemaFactory.createForClass(RefreshToken);
  }

  static get model(): ModelDefinition {
    return {
      name: this.name,
      schema: this.schema,
    };
  }
}
