import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';

import { AppConfigsEnv } from '@/configs/env';

@Injectable()
export class GoogleService {
  oauthClient: Auth.OAuth2Client;

  constructor(private readonly configService: ConfigService<AppConfigsEnv>) {
    this.oauthClient = new google.auth.OAuth2({
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
    });
  }

  async authentication(token: string) {
    return await this.oauthClient.getTokenInfo(token);
  }

  async googleOneTap(token: string) {
    return await this.oauthClient.verifyIdToken({ idToken: token });
  }
}
