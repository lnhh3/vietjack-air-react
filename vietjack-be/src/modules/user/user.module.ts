import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from '@/modules/user/user.controller';
import { User } from '@/schemas/user.schema';
import { LoggerModule } from '@/shared/logger/logger.module';

import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([User.model]), LoggerModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
