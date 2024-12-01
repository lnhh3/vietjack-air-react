import { Prop, Schema } from '@nestjs/mongoose';

import { Shape } from '@/schemas/models/shape.model';
import { schemaOptions } from '@/shared/common/schema';

@Schema(schemaOptions)
export class Layer {
  @Prop({ type: [Shape] })
  shapes: Shape[];
}
