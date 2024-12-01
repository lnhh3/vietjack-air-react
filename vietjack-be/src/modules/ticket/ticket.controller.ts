import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { PagingQueryDTO } from '@/dto/paging-query.dto';
import { ApiPublic } from '@/modules/auth/decorators/api.public';
import { PlaceService } from '@/modules/place/place.service';
import { TicketPostDto } from '@/modules/ticket/dto/ticket-post.dto';
import { TicketService } from '@/modules/ticket/ticket.service';
import { Ticket } from '@/schemas/ticket.schema';
import { Constants } from '@/shared/constants/common';
import { HttpStatusCode } from '@/shared/response/HttpStatusCode';
import ResponseDTO from '@/shared/response/ResponseDTO';
import Validator from '@/shared/Validator';
import { SystemStatus } from '@/types/common';

@ApiTags('Tickets')
@Controller('tickets')
@ApiSecurity(Constants.AUTH_TOKEN)
export class TicketController {
  constructor(
    private ticketService: TicketService,
    private placeService: PlaceService,
  ) {}

  @Post()
  public async createTicket(
    @Body() ticket: TicketPostDto,
  ): Promise<ResponseDTO> {
    const fromPlace = await this.placeService.findByCode(ticket.fromPlaceCode);
    const destinationPlace = await this.placeService.findByCode(
      ticket.destinationPlaceCode,
    );
    Validator.notNull(fromPlace, HttpStatusCode.NOT_FOUND);
    Validator.notNull(destinationPlace, HttpStatusCode.NOT_FOUND);
    Validator.mustTrue(
      fromPlace?.code !== destinationPlace?.code,
      HttpStatusCode.BAD_REQUEST,
    );
    const newTicket = await this.ticketService.create(
      Ticket.builder()
        .title(ticket.title)
        .ticketType(ticket.ticketType)
        .price(ticket.price)
        .systemStatus(SystemStatus.ACTIVE)
        .fromPlaceId(fromPlace!)
        .destinationPlaceId(destinationPlace!)
        .departureDate(new Date(ticket.departureDate))
        .build(),
    );
    return ResponseDTO.success(newTicket);
  }

  @Get()
  @SkipThrottle()
  @ApiPublic()
  async getPaging(@Query() query: PagingQueryDTO): Promise<ResponseDTO> {
    console.log(query);
    return ResponseDTO.success(
      await this.ticketService.getPagingList({
        searchKey: query.searchKey,
        page: query.page,
        pageSize: query.pageSize,
      }),
    );
  }
}
