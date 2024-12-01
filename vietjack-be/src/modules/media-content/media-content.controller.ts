import {
  Controller,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AuthUser } from '@/modules/auth/decorators/auth-user';
import { MediaContentService } from '@/modules/media-content/media-content.service';
import { MediaContentImageResponse } from '@/modules/media-content/models/MediaContentImageResponse';
import { MediaContent } from '@/schemas/media-content.schema';
import { CloudinaryService } from '@/shared/cloudinary/cloudinary.service';
import { AppConfigService } from '@/shared/config/AppConfigService';
import { Constants } from '@/shared/constants/common';
import ResponseDTO from '@/shared/response/ResponseDTO';
import { ApiRoutes } from '@/shared/router/router.constants';
import { AuthUserPayload } from '@/types/auth';
import { SystemStatus } from '@/types/common';
import { MediaContentType } from '@/types/media';

@ApiTags('MediaContent')
@ApiSecurity(Constants.AUTH_TOKEN)
@Controller(ApiRoutes.MEDIA_CONTENT.ROOT)
export class MediaContentController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly appConfigService: AppConfigService,
    private readonly mediaContentService: MediaContentService,
  ) {}

  @ApiOperation({ summary: 'Get list image' })
  @Get(ApiRoutes.MEDIA_CONTENT.IMAGES)
  async getMediaContentImage(@AuthUser() userAuth: AuthUserPayload) {
    const data = await this.mediaContentService.getPagingImages(userAuth.id);
    return ResponseDTO.success(
      data.map((item) => {
        const res = new MediaContentImageResponse(item);
        res.url = this.appConfigService.getFullUrlCloudinary(item.publicId);
        return res;
      }),
    );
  }

  @Post(ApiRoutes.MEDIA_CONTENT.UPLOAD_IMAGE)
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Upload an image to Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @AuthUser() userAuth: AuthUserPayload,
    @UploadedFile(new ParseFilePipe({}))
    file: Express.Multer.File,
  ) {
    const res = await this.cloudinaryService.uploadFile(file);
    const media = MediaContent.builder()
      .type(MediaContentType.IMAGE)
      .uploadedAt(new Date())
      .createdByUserId(new Types.ObjectId(userAuth.id))
      .folder('common')
      .metadata(res)
      .publicId(res.public_id)
      .systemStatus(SystemStatus.ACTIVE)
      .build();
    await this.mediaContentService.create(media);
    return ResponseDTO.success(
      this.appConfigService.getFullUrlCloudinary(res.public_id),
    );
  }
}
