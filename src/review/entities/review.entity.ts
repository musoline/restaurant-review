import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  star: number;

  @Column()
  comment: string;

  @Column({ type: 'timestamptz' })
  date_visit: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;

  @Column()
  restaurantId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column()
  userId: number;
}
