import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsString()
  fullName: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  phoneNumber: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
