import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Hashtag from './Hashtag';
import Post from './Post';

@Entity()
export default class Photo {
  constructor() {
    this.regDtm = new Date();
  }

  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    filePath: string;

  @ManyToOne(() => Post, (post) => post.photos)
    post: Post;

  @Column()
    regDtm: Date;
}
