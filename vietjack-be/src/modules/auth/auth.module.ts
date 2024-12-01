import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtConfigService } from '@/modules/auth/configs/jwt-config.service';
import { GoogleService } from '@/modules/auth/services/google.service';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { UserModule } from '@/modules/user/user.module';
import { LoggerModule } from '@/shared/logger/logger.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, JwtStrategy, GoogleService],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
    PassportModule,
    UserModule,
    ConfigModule,
    LoggerModule,
  ],
})
export class AuthModule {}
