  import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PagingQueryDTO {
  @ApiProperty({ name: 'search_key', required: false })
  @IsOptional()
  @IsString()
  searchKey?: string;

  @IsOptional()
  @ApiProperty({ name: 'page', required: false, type: Number })
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @ApiProperty({ name: 'pageSize', required: false, type: Number })
  @Transform(({ value }) => parseInt(value, 10))
  pageSize?: number = 10;
}
