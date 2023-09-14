import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  star: number;

  @IsString()
  comment: string;

  @IsInt()
  restaurantId: number;

  @IsDate()
  date_visit: Date;
}
