import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';

import { AppConfigsEnv } from '@/configs/env';
import { LoggerService } from '@/shared/logger/logger.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    private readonly configService: ConfigService<AppConfigsEnv>,
    private readonly logger: LoggerService,
  ) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      uri: this.configService.get('DATABASE_BASE_URL', { infer: true }),
      connectionFactory(connection) {
        connection.plugin(mongooseAutoPopulate);
        return connection;
      },
      onConnectionCreate: () => {
        this.logger.debug(
          'MongooseConfigService connection created',
          'DATABASE',
        );
      },
    };
  }
}
