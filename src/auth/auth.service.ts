import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { ValidateUserDto } from './dto/validate-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    validateUserDto: ValidateUserDto,
  ): Promise<AuthUserDto | null> {
    const { email, password } = validateUserDto;
    const user = await this.usersService.findOneWithEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(authUserDto: AuthUserDto) {
    const payload = { email: authUserDto.email, sub: authUserDto.id };
    return {
      user: authUserDto,
      jwt: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(authUserDto: AuthUserDto) {
    const payload = { email: authUserDto.email, sub: authUserDto.id };

    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}
