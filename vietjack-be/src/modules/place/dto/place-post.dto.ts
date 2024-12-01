import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlacePostDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  code: string;
}
