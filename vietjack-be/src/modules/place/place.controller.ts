import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { PagingQueryDTO } from '@/dto/paging-query.dto';
import { ApiPublic } from '@/modules/auth/decorators/api.public';
import { PlacePostDto } from '@/modules/place/dto/place-post.dto';
import { PlaceService } from '@/modules/place/place.service';
import { Place } from '@/schemas/place.schema';
import { Constants } from '@/shared/constants/common';
import { HttpStatusCode } from '@/shared/response/HttpStatusCode';
import { HttpStatusMessage } from '@/shared/response/HttpStatusMessage';
import ResponseDTO from '@/shared/response/ResponseDTO';
import Validator from '@/shared/Validator';

@ApiTags('Place')
@Controller('places')
@ApiSecurity(Constants.AUTH_TOKEN)
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Post()
  public async createNewPlace(
    @Body() data: PlacePostDto,
  ): Promise<ResponseDTO> {
    const exist = await this.placeService.findByCode(data.code);
    Validator.mustNull(
      exist,
      HttpStatusCode.ALREADY_EXISTS,
      HttpStatusMessage.ALREADY_EXISTS,
    );
    return ResponseDTO.success(
      await this.placeService.create(
        Place.builder().title(data.title).code(data.code).build(),
      ),
    );
  }

  @ApiPublic()
  @Get()
  public async getListPaging(@Query() query: PagingQueryDTO) {
    return ResponseDTO.success(
      await this.placeService.getPagingList({ ...query }),
    );
  }
}
