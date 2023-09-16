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
  ) { }

  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDto> {
    return await this.restaurantRepository.save(createRestaurantDto);
  }

  findAll() {
    return this.restaurantRepository.find();
  }

  async findOneWithRating(id: number): Promise<Restaurant | null | undefined> {
    return await this.restaurantRepository
      .createQueryBuilder('res')
      .select('res.id', 'id')
      .addSelect('res.name', 'name')
      .addSelect('AVG(rw.star)', 'rating')
      .addSelect('MIN(rw.star)', "lowest")
      .addSelect('MAX(rw.star)', "highest")
      .leftJoin(Review, 'rw', 'res.id = rw.restaurantId')
      .where('res.id = :id', { id })
      .groupBy('res.id')
      .getRawOne();
  }

  async findAllWithRating(): Promise<Restaurant[] | null | undefined> {
    return await this.restaurantRepository
      .createQueryBuilder('res')
      .select('res.id', 'id')
      .addSelect('res.name', 'name')
      .addSelect('AVG(rw.star)', 'rating')
      .leftJoin(Review, 'rw', 'res.id = rw.restaurantId')
      .groupBy('res.id')
      .getRawMany();
  }

  async seedData() {
    const dataToSeed: CreateRestaurantDto[] = [
      { name: 'Restaurant 1' },
      { name: 'Restaurant 2' },
      { name: 'Restaurant 3' },
      { name: 'Restaurant 4' },
      { name: 'Restaurant 5' },
      { name: 'Restaurant 6' },
      { name: 'Restaurant 7' },
      { name: 'Restaurant 8' },
      { name: 'Restaurant 9' },
      { name: 'Restaurant 10' },
    ];

    await Promise.all(
      dataToSeed.map(async (data: CreateRestaurantDto) => {
        this.create(data);
      }),
    );
  }
}
