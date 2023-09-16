import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { ReviewService } from 'src/review/review.service';
import { DataSource } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    private restaurantService: RestaurantService,
    private reviewService: ReviewService,
    @InjectDataSource() private readonly connection: DataSource,
  ) {}

  async seedData() {
    this.connection.query(`TRUNCATE restaurant RESTART IDENTITY CASCADE;`);
    await this.restaurantService.seedData();
    // this.connection.query(`TRUNCATE review RESTART IDENTITY CASCADE;`);
    // await this.reviewService.seedData();
  }
}
