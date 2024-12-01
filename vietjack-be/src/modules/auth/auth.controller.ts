import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from '@/modules/auth/auth.service';
import { ApiPublic } from '@/modules/auth/decorators/api.public';
import { AuthUser } from '@/modules/auth/decorators/auth-user';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { SignupDto } from '@/modules/auth/dto/signup.dto';
import { UserDto } from '@/modules/auth/dto/user.dto';
import { AuthResponse } from '@/modules/auth/responses/auth.response';
import { UserService } from '@/modules/user/user.service';
import { Constants } from '@/shared/constants/common';
import { LoggerService } from '@/shared/logger/logger.service';
import { HttpStatusCode } from '@/shared/response/HttpStatusCode';
import { HttpStatusMessage } from '@/shared/response/HttpStatusMessage';
import ResponseDTO from '@/shared/response/ResponseDTO';
import { ApiRoutes } from '@/shared/router/router.constants';
import Validator from '@/shared/Validator';
import { AuthUserPayload } from '@/types/auth';

@ApiTags('Auth')
@Controller({
  path: ApiRoutes.AUTH.ROOT,
})
@ApiSecurity(Constants.AUTH_TOKEN)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({
    status: 200,
    description: 'Data',
    type: AuthResponse,
  })
  @ApiPublic()
  @Post('/sign-up')
  async authSignUp(@Body() body: SignupDto) {
    return ResponseDTO.success(await this.authService.registerUser(body));
  }

  @ApiOperation({ summary: 'Sign up admin' })
  @ApiResponse({
    status: 200,
    description: 'Data',
    type: AuthResponse,
  })
  @ApiPublic()
  @Post('/sign-up/admin')
  async authSignUpAdmin(@Body() body: SignupDto) {
    return ResponseDTO.success(await this.authService.registerUserAdmin(body));
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Data',
    type: AuthResponse,
  })
  @ApiPublic()
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return ResponseDTO.success(await this.authService.login(body));
  }

  @ApiOperation({ summary: 'Get auth infomation' })
  @ApiResponse({
    status: 200,
    description: 'Data',
    type: UserDto,
  })
  @Get()
  async getAuthInfo(@AuthUser() user: AuthUserPayload) {
    const authInfo = await this.userService.getByIdAndSystemStatus(user.id);
    Validator.notNull(
      authInfo,
      HttpStatusCode.UNAUTHORIZED,
      HttpStatusMessage.UNAUTHORIZED,
    );
    return ResponseDTO.success(new UserDto(authInfo!));
  }


}
