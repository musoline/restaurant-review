import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { User } from './user.entity';
import { Review } from './review.entity';
@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Review, (review) => review.comments)
  review: Review;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
