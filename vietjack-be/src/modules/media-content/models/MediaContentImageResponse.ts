import { ApiProperty } from '@nestjs/swagger';

import { MediaContentDocument } from '@/schemas/media-content.schema';

export class MediaContentImageResponse {
  @ApiProperty()
  url: string;
  @ApiProperty()
  id: string;

  constructor(item: MediaContentDocument) {
    this.id = item.id;
    this.url = item.publicId;
  }
}
