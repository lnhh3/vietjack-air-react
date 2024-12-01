import { Global, Module } from '@nestjs/common';

import { AppConfigService } from '@/shared/config/AppConfigService';

@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
