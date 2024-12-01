import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { PlaceBuilder } from '@/schemas/builder/place.builder';
import { schemaOptions } from '@/shared/common/schema';
import { BaseDocumentType, BaseModelType, SystemStatus } from '@/types/common';

export type PlaceDocument = BaseDocumentType<Place>;
export type PlaceModel = BaseModelType<Place>;

@Schema({
  collection: 'places',
  ...schemaOptions,
})
export class Place {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ enum: SystemStatus })
  systemStatus: SystemStatus;

  static get schema() {
    return SchemaFactory.createForClass(Place);
  }

  static get model(): AsyncModelFactory {
    return {
      name: Place.name,
      useFactory: () => {
        return this.schema;
      },
    };
  }

  static builder() {
    return new PlaceBuilder();
  }
}
