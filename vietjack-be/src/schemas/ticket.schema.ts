import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { TicketBuilder } from '@/schemas/builder/ticket.builder';
import { Place } from '@/schemas/place.schema';
import { schemaOptions } from '@/shared/common/schema';
import { BaseDocumentType, BaseModelType, SystemStatus } from '@/types/common';
import { TicketType } from '@/types/ticket';

export type TicketDocument = BaseDocumentType<Ticket>;
export type TicketModel = BaseModelType<Ticket>;
@Schema({
  collection: 'tickets',
  ...schemaOptions,
})
export class Ticket {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Date, required: true })
  departureDate: Date;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ enum: TicketType })
  ticketType: TicketType;

  @Prop({ type: Types.ObjectId, ref: 'Place' })
  fromPlace: Place;

  @Prop({ type: Types.ObjectId, ref: 'Place' })
  destinationPlace: Place;

  @Prop({ enum: SystemStatus })
  systemStatus: SystemStatus;

  static get schema() {
    return SchemaFactory.createForClass(Ticket);
  }

  static get model(): AsyncModelFactory {
    return {
      name: Ticket.name,
      useFactory: () => {
        return this.schema;
      },
    };
  }

  static builder() {
    return new TicketBuilder();
  }
}
