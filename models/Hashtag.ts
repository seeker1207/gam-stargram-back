import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Post from './Post';

@Entity()
export default class Hashtag {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @ManyToMany(() => Post, (post) => post.hashtags)
    posts: Post[];
}
