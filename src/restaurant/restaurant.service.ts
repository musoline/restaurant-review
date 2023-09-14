import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { Review } from 'src/review/entities/review.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDto> {
    return await this.restaurantRepository.save(createRestaurantDto);
  }

  findAll() {
    return this.restaurantRepository.find({});
  }

  async findOne(id: number): Promise<Restaurant | null> {
    return await this.restaurantRepository.findOneBy({ id });
  }

  async findAllWithReview() {
    const restaurants = await this.restaurantRepository
      .createQueryBuilder('res')
      .select('res.id', 'RestaurantID')
      .addSelect('AVG(rw.star)', 'rating')
      .leftJoin(Review, 'rw', 'res.id = rw.restaurantId')
      .groupBy('res.id')
      .getRawMany();

    // .getMany();
    // const restaurants = await this.restaurantRepository
    // .createQueryBuilder('restaurant')
    // .leftJoinAndSelect('restaurant.reviews', 'review')
    // .getMany();
    return restaurants;
    // return restaurants.map((restaurant) => {
    //   const reviewsCount = restaurant.reviews.length;
    //   const initialValue = 0;
    //   const sumWithInitial = restaurant.reviews
    //     .map((rev) => rev.star)
    //     .reduce(
    //       (accumulator, currentValue) => accumulator + currentValue,
    //       initialValue,
    //     );
    //   return sumWithInitial / reviewsCount;
    // });
  }

  async seedData() {
    const dataToSeed: CreateRestaurantDto[] = [
      { name: 'Restaurant 1' },
      { name: 'Restaurant 2' },
      { name: 'Restaurant 3' },
      { name: 'Restaurant 4' },
    ];

    await Promise.all(
      dataToSeed.map(async (data: CreateRestaurantDto) => {
        this.create(data);
      }),
    );
  }
}
