import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlaceModule } from '@/modules/place/place.module';
import { TicketController } from '@/modules/ticket/ticket.controller';
import { TicketService } from '@/modules/ticket/ticket.service';
import { Ticket } from '@/schemas/ticket.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([Ticket.model]), PlaceModule],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService],
})
export class TicketModule {}
