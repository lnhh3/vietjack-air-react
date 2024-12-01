import { Prop, Schema } from '@nestjs/mongoose';

import { schemaOptions } from '@/shared/common/schema';
import { ShapeType } from '@/types/design';

@Schema(schemaOptions)
export class Shape {
  @Prop({ type: Number })
  x: number;
  @Prop({ type: Number })
  y: number;
  @Prop({ type: Number })
  width: number;
  @Prop({ type: String })
  name: string;
  @Prop({ type: Number })
  height: number;
  @Prop({ enum: ShapeType })
  type: ShapeType;
  @Prop({ type: String })
  fill?: string;
  @Prop({ type: String })
  elementId?: string;
  @Prop({ type: Boolean })
  draggable?: boolean;
  @Prop({ type: Boolean })
  rootLayer?: boolean;
}
