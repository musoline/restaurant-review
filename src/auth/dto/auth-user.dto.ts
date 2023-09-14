import { IsEmail, IsInt, IsString } from 'class-validator';

export class AuthUserDto {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;

}
