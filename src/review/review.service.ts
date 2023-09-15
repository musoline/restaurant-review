import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto, user: AuthUserDto) {
    return this.reviewRepository.save({
      star: createReviewDto.star,
      comment: createReviewDto.comment,
      date_visit: createReviewDto.date_visit,
      restaurantId: createReviewDto.restaurantId,
      userId: user.id,
    });
  }

  findAll() {
    // return this.reviewRepository.createQueryBuilder("review").select("AVG(review.star)","rating").getRawOne();
    return this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.star)', 'rating')
      .getRawMany();
  }

  async findAverageOfRestaurant(restaurantId: number) {
    return this.average(
      (await this.reviewRepository.findBy({ restaurantId })).map(
        (el) => el.star,
      ),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  private async average(arr: number[]) {
    const length = arr.length;
    const initialValue = 0;
    const sumWithInitial = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue,
    );

    return sumWithInitial / length;
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
