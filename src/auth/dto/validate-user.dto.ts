import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ValidateUserDto {
  @ApiProperty({
    description: 'Email of user',
    default: 'test@test.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description:
      'password for user with one uppercase one lowercase one numeric',
    minimum: 8,
    default: 'Test12345',
  })
  @IsString()
  password: string;
}
