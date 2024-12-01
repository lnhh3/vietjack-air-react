import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Ticket, TicketDocument, TicketModel } from '@/schemas/ticket.schema';
import { PagingResponseDTO } from '@/shared/response/PagingResponseDTO';
import { PagingFilterRequest } from '@/types/PagingFilterRequest';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: TicketModel) {}

  async create(ticket: Ticket): Promise<TicketDocument> {
    return this.ticketModel.create(ticket);
  }

  async getPagingList({
    searchKey,
    page = 1,
    pageSize = 10,
  }: PagingFilterRequest): Promise<any> {
    const offset = (page - 1) * pageSize;
    const filter = searchKey
      ? {
          $or: [
            { title: { $regex: searchKey, $options: 'i' } }, // Case-insensitive search for title
            { code: { $regex: searchKey, $options: 'i' } }, // Case-insensitive search for code
          ],
        }
      : {};
    const list = await this.ticketModel
      .find(filter)
      .populate('fromPlace')
      .populate('destinationPlace')
      .limit(pageSize)
      .skip(offset)
      .exec();
    const totalElements = await this.ticketModel.countDocuments(filter);
    const totalPages = Math.ceil(totalElements / pageSize);

    return new PagingResponseDTO(list, {
      totalPages: totalPages,
      totalElements: totalElements,
      currentPage: page,
      elementPerPage: pageSize,
    });
  }
}
