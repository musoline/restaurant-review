import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) { }

  create(createReviewDto: CreateReviewDto, user: AuthUserDto) {
    return this.reviewRepository.save({
      star: createReviewDto.star,
      comment: createReviewDto.comment,
      date_visit: createReviewDto.date_visit,
      restaurantId: createReviewDto.restaurantId,
      userId: user.id,
    });
  }

  async findAll() {
    return await this.reviewRepository
      .createQueryBuilder('rew')
      .select('rew.id', 'id')
      .addSelect('rew.star', "star")
      .addSelect('rew.comment', 'comment')
      .addSelect('rew.date_visit', 'visitDate')
      .addSelect("user.name", "userName")
      .leftJoin(User, 'user', 'user.id = rew.userId')
      .groupBy('rew.id').addGroupBy("user.id")
      .getRawMany();
  }


  async findAllWithRestaurantId(id: number) {
    return await this.reviewRepository
      .createQueryBuilder('rew')
      .select('rew.id', 'id')
      .addSelect('rew.star', "star")
      .addSelect('rew.comment', 'comment')
      .addSelect('rew.date_visit', 'visitDate')
      .addSelect("user.name", "userName")
      .leftJoin(User, 'user', 'user.id = rew.userId')
      .where('rew.restaurantId = :id', { id })
      .orderBy("rew.id", "DESC")
      .groupBy('rew.id').addGroupBy("user.id")
      .getRawMany();
  }
  
  async seedData() {
    const dataToSeed: CreateReviewDto[] = [
      {
        star: 1,
        comment: 'Hello World',
        restaurantId: 3,

        date_visit: new Date(),
      },
      {
        star: 1,
        comment: 'Hello World',
        restaurantId: 2,

        date_visit: new Date(),
      },
      {
        star: 1,
        comment: 'Hello World',
        restaurantId: 4,

        date_visit: new Date(),
      },
      {
        star: 4,
        comment: 'Hello World',
        restaurantId: 1,

        date_visit: new Date(),
      },
    ];

    await Promise.all(
      dataToSeed.map(async (data: CreateReviewDto) => {
        // this.create(data, { id: 1, email: 'test@test.com' });
      }),
    );
  }
}
