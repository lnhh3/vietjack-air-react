import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfigsEnv } from '@/configs/env';
import { Constants } from '@/shared/constants/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService<AppConfigsEnv>) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromHeader(Constants.AUTH_TOKEN),
    });
  }

  validate(payload: any) {
    return payload;
  }
}
