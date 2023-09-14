import { IsEmail, IsInt, IsString } from 'class-validator';

export class ValidateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
