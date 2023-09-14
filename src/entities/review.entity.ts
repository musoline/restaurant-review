import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  star: number;

  @Column({ type: 'timestamptz' }) 
  date_visit: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];
}
