import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';

@Controller('api/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: { user: AuthUserDto },
  ) {
    return this.reviewService.create(createReviewDto, req.user);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(":id")
  findAllWithUser(@Param("id") id: number) {
    return this.reviewService.findAllWithRestaurantId(+id);
  }

}
