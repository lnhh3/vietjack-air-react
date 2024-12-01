import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Place, PlaceDocument, PlaceModel } from '@/schemas/place.schema';
import { PagingResponseDTO } from '@/shared/response/PagingResponseDTO';
import { PagingFilterRequest } from '@/types/PagingFilterRequest';

@Injectable()
export class PlaceService {
  constructor(@InjectModel(Place.name) private placeModel: PlaceModel) {}

  async findByCode(code: string): Promise<PlaceDocument | null> {
    return this.placeModel.findOne({ code });
  }

  async create(place: Place): Promise<PlaceDocument> {
    return this.placeModel.create(place);
  }

  async getPagingList({
    searchKey,
    page = 1,
    pageSize = 10,
  }: PagingFilterRequest): Promise<any> {
    const offset = (page - 1) * pageSize;
    const filter = searchKey ? { title: searchKey } : undefined;
    const list = await this.placeModel
      .find(filter as any)
      .limit(pageSize)
      .skip(offset)
      .exec();
    const totalElements = await this.placeModel.countDocuments();
    const totalPages = Math.ceil(totalElements / pageSize);

    return new PagingResponseDTO(list, {
      totalPages: totalPages,
      totalElements: totalElements,
      currentPage: page,
      elementPerPage: pageSize,
    });
  }
}
