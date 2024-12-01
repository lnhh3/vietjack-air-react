import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from '@/modules/auth/dto/login.dto';
import { SignupDto } from '@/modules/auth/dto/signup.dto';
import { AuthResponse } from '@/modules/auth/responses/auth.response';
import { GoogleService } from '@/modules/auth/services/google.service';
import { UserService } from '@/modules/user/user.service';
import { User, UserDocument } from '@/schemas/user.schema';
import { LoggerService } from '@/shared/logger/logger.service';
import { HttpStatusCode } from '@/shared/response/HttpStatusCode';
import Validator from '@/shared/Validator';
import { SystemStatus } from '@/types/common';
import { UserRole } from '@/types/role';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly logger: LoggerService,
    private readonly googleService: GoogleService,
  ) {}

  async createAccessToken(user: UserDocument) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    });
  }

  async registerUser(user: SignupDto) {
    const userExist = await this.userService.getByEmail(user.email);
    Validator.mustNull(userExist, HttpStatusCode.ALREADY_EXISTS);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const newUser = await this.userService.createUser(
      User.builder()
        .fullName(user.fullName)
        .phoneNumber(user.phoneNumber)
        .email(user.email)
        .systemStatus(SystemStatus.ACTIVE)
        .userRole(UserRole.USER)
        .passwordHashed(hash)
        .passwordSalt(salt)
        .build(),
    );
    return AuthResponse.builder()
      .accessToken(await this.createAccessToken(newUser))
      .build();
  }

  async registerUserAdmin(user: SignupDto) {
    const userExist = await this.userService.getByEmail(user.email);
    Validator.mustNull(userExist, HttpStatusCode.ALREADY_EXISTS);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const newUser = await this.userService.createUser(
      User.builder()
        .fullName(user.fullName)
        .phoneNumber(user.phoneNumber)
        .email(user.email)
        .systemStatus(SystemStatus.ACTIVE)
        .userRole(UserRole.ADMIN)
        .passwordHashed(hash)
        .passwordSalt(salt)
        .build(),
    );
    return AuthResponse.builder()
      .accessToken(await this.createAccessToken(newUser))
      .build();
  }

  async login(user: LoginDto) {
    const userExist = await this.userService.getByEmail(user.email);
    Validator.notNull(userExist, HttpStatusCode.UNAUTHORIZED);
    const isMatch = await bcrypt.compare(
      user.password,
      <string>userExist?.passwordHashed,
    );
    if (!isMatch) {
      Validator.notNull(userExist, HttpStatusCode.UNAUTHORIZED);
    }
    return AuthResponse.builder()
      .accessToken(await this.createAccessToken(userExist!))
      .build();
  }
}
