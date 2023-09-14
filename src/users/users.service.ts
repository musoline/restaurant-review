import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password_hash = await bcrypt.hash(createUserDto.password, 12);

    createUserDto = { ...createUserDto, password: password_hash };

    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user).catch((e) => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
      return e;
    });

    const { password, ...result } = user;

    return result;
  }

  async findOne(condition: any): Promise<User | null> {
    return this.userRepository.findOne(condition);
  }

  async findOneWithEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
