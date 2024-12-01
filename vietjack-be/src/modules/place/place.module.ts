import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlaceController } from '@/modules/place/place.controller';
import { PlaceService } from '@/modules/place/place.service';
import { Place } from '@/schemas/place.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([Place.model])],
  providers: [PlaceService],
  exports: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule {}
