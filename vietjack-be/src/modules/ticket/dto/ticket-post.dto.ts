import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { TicketType } from '@/types/ticket';

export class TicketPostDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  departureDate: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsEnum(TicketType)
  ticketType: TicketType;
  @ApiProperty()
  @IsString()
  fromPlaceCode: string;
  @ApiProperty()
  @IsString()
  destinationPlaceCode: string;
}
