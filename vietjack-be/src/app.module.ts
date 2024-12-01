import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { MongooseConfigService } from '@/database/MongooseConfig.service';
import { JwtAuthGuard } from '@/modules/auth/guards/JwtAuthGuard';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { AppConfigModule } from '@/shared/config/AppConfigModule';
import { HttpExceptionFilter } from '@/shared/exceptions/HttpExceptionFilter';
import { LoggerModule } from '@/shared/logger/logger.module';
import { HttpStatusMessage } from '@/shared/response/HttpStatusMessage';
import { RouterModule } from '@/shared/router/router.module';

import { getEnv } from './configs/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnv(),
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [LoggerModule],
    }),
    ThrottlerModule.forRoot({
      errorMessage: HttpStatusMessage.TOO_MANY_REQUESTS,
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    RouterModule,
    LoggerModule,
    AppConfigModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
