import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { MediaContentModule } from '@/modules/media-content/media-content.module';
import { PlaceModule } from '@/modules/place/place.module';
import { TicketModule } from '@/modules/ticket/ticket.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MediaContentModule,
    TicketModule,
    PlaceModule,
  ],
})
export class RouterModule {}
