import { Types } from 'mongoose';

import { Place } from '@/schemas/place.schema';
import { Ticket } from '@/schemas/ticket.schema';
import { SystemStatus } from '@/types/common';
import { TicketType } from '@/types/ticket';

export class TicketBuilder {
  private readonly instance: Ticket;

  constructor() {
    this.instance = new Ticket();
  }

  title(title: string) {
    this.instance.title = title;
    return this;
  }

  departureDate(departureDate: Date) {
    this.instance.departureDate = departureDate;
    return this;
  }

  price(price: number) {
    this.instance.price = price;
    return this;
  }

  ticketType(ticketType: TicketType) {
    this.instance.ticketType = ticketType;
    return this;
  }

  systemStatus(systemStatus: SystemStatus) {
    this.instance.systemStatus = systemStatus;
    return this;
  }

  fromPlaceId(fromPlace: Place) {
    this.instance.fromPlace = fromPlace;
    return this;
  }

  destinationPlaceId(destinationPlace: Place) {
    this.instance.destinationPlace = destinationPlace;
    return this;
  }

  build() {
    return this.instance;
  }
}
