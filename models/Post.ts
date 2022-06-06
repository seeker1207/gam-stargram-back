import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Photo from './Photo';
import Hashtag from './Hashtag';
import User from './User';

@Entity()
export default class Post {
  constructor(inputPost: Post | undefined) {
    if (!inputPost) return;

    this.description = inputPost.description;
    this.regDtm = new Date();
  }

  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    description: string;

  @OneToMany(() => Photo, (photo) => photo.post, {
    cascade: true,
  })
    photos: Photo[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts, {
    cascade: true,
  })
  @JoinTable()
    hashtags: Hashtag[];

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
  })
    user: User;

  @Column()
    regDtm: Date;
}
