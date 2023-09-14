import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Review])],
  providers: [SeederService, RestaurantService, ReviewService],
  exports: [SeederService],
})
export class SeederModule {}
